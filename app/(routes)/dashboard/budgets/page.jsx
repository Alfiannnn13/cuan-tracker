import React from 'react'
import BudgetList from './_components/BudgetList'
import CreateBudget from './_components/CreateBudget'

function Budget() {
  return (
    <div clasName="p-10">
        <h2 className="font-bold text-primary text-3xl">
            Keuangan Saya
        </h2>
        <BudgetList/>
    </div>
  )
}

export default Budget