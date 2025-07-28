import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverView = ({transactions, onAddIncome}) => {

    const [chartData, setChartData] = useState([]);

     useEffect(() => {
            const result = prepareIncomeBarChartData(transactions);
            setChartData(result);
    
            return () => {};
        }, [transactions]);

  return (
    
    <div className='card w-full'>
        <div className='flex items-center justify-between col-auto'>
            <div className=''>
                <h5 className='text-lg font-semibold'>Income Overview</h5>
                <p className='text-xs text-gray-400 mt-1'>Track your earnings</p>
            </div>
            <button className='add-btn' onClick={onAddIncome}>
                <LuPlus className='text-lg'/>
                Add Income
            </button>
        </div>
        <div className='mt-10'>
            <CustomBarChart data={chartData}/>
        </div>
    </div>
  )
}

export default IncomeOverView