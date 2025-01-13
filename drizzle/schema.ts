import { pgTable, serial, varchar, numeric, date, foreignKey, integer, timestamp, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const accounts = pgTable("accounts", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	balance: numeric({ precision: 10, scale:  2 }),
});

export const budgets = pgTable("budgets", {
	id: serial().primaryKey().notNull(),
	amount: numeric({ precision: 10, scale:  2 }),
	startDate: date("start_date"),
	endDate: date("end_date"),
});

export const transactions = pgTable("transactions", {
	id: serial().primaryKey().notNull(),
	amount: numeric({ precision: 10, scale:  2 }).notNull(),
	type: varchar({ length: 50 }).notNull(),
	accountId: integer("account_id").notNull(),
	date: timestamp({ mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	category: text("Category").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.accountId],
			foreignColumns: [accounts.id],
			name: "transactions_account_id_fkey"
		}),
]);
