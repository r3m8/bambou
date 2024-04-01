import db from "@/lib/db";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/encryption";
import { z } from 'zod';

const emailRegex = process.env.EMAIL_SCHEMA
  ? new RegExp(`^[^\\s@]+@${process.env.EMAIL_SCHEMA.replace('.', '\\.')}$`)
  : null;

function isValidEmailDomain(email: string): boolean {
    return emailRegex ? emailRegex.test(email) : true;
}

async function isEmailUnique(email: string): Promise<boolean> {
    const emailInDb = await db.user.findUnique({ where: { email } });
    return !emailInDb;
}

const userSchema = z.object({
    email: z.string()
        .min(1, 'Email is required')
        .email('Invalid email format')
        .refine(isValidEmailDomain, {
            message: 'Email domain is not allowed.',
        }),
    password: z.string()
        .min(8, 'Password must have at least 8 characters'),
});

export async function GET(): Promise<NextResponse> {
    return new NextResponse('Method Not Allowed', { status: 405 });
}

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const body = await req.json();
        const parsedBody = userSchema.parse(body);

        if (!(await isEmailUnique(parsedBody.email))) {
            return new NextResponse(JSON.stringify({ error: "Email is already registered." }), { status: 400 });
        }

        const { email, password } = parsedBody;
        const hashedPassword = await hashPassword(password);

        await db.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ user: email, message: "User successfully created." });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify({ errors: error.flatten() }), { status: 400 });
        }

        return new NextResponse('Internal Server Error', { status: 500 });
    }
}