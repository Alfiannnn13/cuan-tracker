import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import {  Budgets, Expenses } from "@/utils/schema";
import moment from "moment";
import React,{useState} from "react";
import { toast } from "sonner";

function AddExpense({budgetId, user, refreshData}) {

    const[name,setName]=useState();
    const[amount,setAmount]=useState();

    const addNewExpense= async() => {
        const result = await db.insert (Expenses).values({
            name: name,
            amount: amount,
            budgetId:budgetId,
            createdAt: moment().format('DD/MM/yyyy')
        }).returning({insertedId:Budgets.id});
        console.log(result);
        if (result) {
            refreshData()
            toast('new expese added')
        }
    }
  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Tambah</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Nama</h2>
        <Input
          placeholder="cth. Kopi"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Jumlah</h2>
        <Input
          type="number"
          placeholder="cth. 50000"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button disabled={!(name&&amount)}
      onClick={addNewExpense}
      className="mt-3 w-full">Simpan</Button>
    </div>
  );
}

export default AddExpense;
