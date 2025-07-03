
# 📘 Prisma + NextAuth Cheat Sheet

## 🟦 Prisma

### 📦 Ініціалізація
```bash
npx prisma init
```

### 🛠️ Міграції
```bash
npx prisma migrate dev --name init
npx prisma migrate reset
npx prisma migrate deploy
```

### 🔁 Генерація Prisma Client
```bash
npx prisma generate
```

### 🔍 Перегляд бази
```bash
npx prisma studio
```

### 📋 Запити
```ts
import { prisma } from "@/lib/prisma";

await prisma.user.create({ data: { email: "user@example.com", name: "John", password: "hashed" } });

await prisma.user.findUnique({ where: { email: "user@example.com" } });

await prisma.user.update({ where: { id: 1 }, data: { name: "New name" } });
```

---

## 🔐 NextAuth

### 🔧 Налаштування `authOptions`
```ts
export const authOptions = {
  providers: [CredentialsProvider({...})],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};
```

### 🔑 Авторизація
```ts
const res = await signIn("credentials", {
  redirect: false,
  email,
  password,
});
```

### 🧠 Сесія (клієнт)
```ts
import { useSession } from "next-auth/react";
const { data: session, status } = useSession();
```

### 🧠 Сесія (сервер/API)
```ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
const session = await getServerSession(authOptions);
```

### 🧾 Token у middleware
```ts
import { getToken } from "next-auth/jwt";
const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
```

### 🔄 Оновлення сесії
```ts
const { update } = useSession();
await update();
```
