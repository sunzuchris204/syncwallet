import { relations } from "drizzle-orm/relations";
import { accounts, transactions } from "./schema";

export const transactionsRelations = relations(transactions, ({one}) => ({
	account: one(accounts, {
		fields: [transactions.accountId],
		references: [accounts.id]
	}),
}));

export const accountsRelations = relations(accounts, ({many}) => ({
	transactions: many(transactions),
}));