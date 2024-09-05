// "use client";
// import React, { useEffect, useState } from "react";
// import CreateBudget from "./CreateBudget";
// import { db } from "@/utils/dbConfig";
// import { desc, eq, getTableColumns, sql } from "drizzle-orm";
// import { Budgets, Expenses } from "@/utils/schema";
// import { useUser } from "@clerk/nextjs";
// import BudgetItem from "./BudgetItem";
// import { Skeleton } from "@/components/ui/skeleton";

// function BudgetList() {
//   const [budgetList, setBudgetList] = useState([]);
//   const { user } = useUser();
//   useEffect(() => {
//     user && getBudgetList();
//   }, [user]);
//   /**
//    * used to get budget list
//    */

//   const getBudgetList = async () => {
//     const result = await db
//       .select({
//         ...getTableColumns(Budgets),
//         totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
//         totalItem: sql`count(${Expenses.id})`.mapWith(Number),
//       })
//       .from(Budgets)
//       .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
//       .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
//       .groupBy(Budgets.id)
//       .orderBy(desc(Budgets.id));

//     setBudgetList(result);
//   };
//   return (
//     <div className="m-10">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
//         <CreateBudget refreshData={() => getBudgetList()} />
//         {budgetList?.length > 0
//           ? budgetList.map((budget, index) => <BudgetItem budget={budget} />)
//           : [1, 2, 3, 4, 5, 6].map((item, index) => (
//               <div
//                 className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
//                 key={index}
//               >
//                 {" "}
//                 <Skeleton className="h-[125px] w-[250px] rounded-xl" />
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-[250px]" />
//                   <Skeleton className="h-4 w-[200px]" />
//                 </div>
//               </div>
//             ))}
//       </div>
//     </div>
//   );
// }

// export default BudgetList;

"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import { Skeleton } from "@/components/ui/skeleton";

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  /**
   * Fetches the budget list from the database.
   */
  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
  };

  return (
    <div className="m-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <CreateBudget refreshData={() => getBudgetList()} />
        {budgetList?.length > 0 ? (
          budgetList.map((budget, index) => (
            <BudgetItem key={index} budget={budget} />
          ))
        ) : (
          // Skeleton loading placeholders
          Array(6).fill(0).map((_, index) => (
            <div
              className="w-full bg-slate-200 rounded-lg p-4 animate-pulse space-y-4"
              key={index}
            >
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[75%]" />
                <Skeleton className="h-4 w-[60%]" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BudgetList;
