import React from 'react'
import CustomPieChart from '../charts/CustomPieChart'

const COLORS = ["#b9ea0e", "#2196F3", "#F44336"]



const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {

    const balanceData = [
        {name: "Total Balance", amount: totalBalance},
        {name: "Total Income", amount: totalIncome},
        {name: "Total Expense", amount: totalExpense},
    ]

  return (
  <div className='card bg-[#edd6f8] p-6'>
  <div className='mb-4'>
    <h5 className='text-lg text-black font-semibold'>Financial Overview</h5>
  </div>

  <div className='flex justify-center'>
    <CustomPieChart
      data={balanceData}
      label="Current Balance"
      totalAmount={`₹ ${totalBalance}`}
      colors={COLORS}
      showTextAnchor
    />
  </div>
</div>



  )
}

export default FinanceOverview