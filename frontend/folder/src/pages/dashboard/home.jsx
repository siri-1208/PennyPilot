import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { addThousandsSeparator } from '../../utils/helper'
import InfoCard from '../../components/cards/InfoCard'
import { IoMdCard } from "react-icons/io";
import RecentTransactions from '../../components/cards/RecentTransactions'
import FinanceOverview from '../../components/cards/FinanceOverview'
import ExpenseTransactions from '../../components/cards/ExpenseTransactions'
import Last30DaysExpenses from '../../components/cards/Last30DaysExpenses'
import RecentIncome from '../../components/cards/RecentIncome'
import Last60daysIncomeChart from '../../components/charts/Last60daysIncomeChart'


const Home = () => {
  //only login users can see dashboard
  useUserAuth()

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data){
        setDashboardData(response.data);
      }
    } catch (error){
      console.log ("Something went wrong. Please try again.", error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(); 
    return () => {

    }
  }, [])
  
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
         <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
         <InfoCard
          icon = {<IoMdCard/>}
          label = "Current Balance"
          value = {addThousandsSeparator (dashboardData?.totalBalance || 0)}
          color = "bg-primary"/>

          <InfoCard
          icon = {<IoMdCard/>}
          label = "Total Income"
          value = {addThousandsSeparator (dashboardData?.totalIncome || 0)}
          color = "bg-primary"/>

          <InfoCard
          icon = {<IoMdCard/>}
          label = "Total Expenses"
          value = {addThousandsSeparator (dashboardData?.totalExpense || 0)}
          color = "bg-primary"/>

          </div>

    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
  
       <RecentTransactions
          transactions = {dashboardData?.recentTransactions}
          onSeeMore = {() => navigate("/expense")}
          />

       <FinanceOverview
          totalBalance = {dashboardData?.totalBalance || 0}
          totalIncome = {dashboardData?.totalIncome || 0}
          totalExpense = {dashboardData?.totalExpense || 0}
          /> 
 
        <ExpenseTransactions
          transactions= {dashboardData?.last30DaysExpenses?.transactions || []}
          onSeeMore={() => navigate("/expense")} />


      {/* <Last30DaysExpenses
          data = {dashboardData?.last30DaysExpenses?.transactions || []}
        />  */}
      
      <Last60daysIncomeChart
        data= {dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
        totalIncome = {dashboardData?.totalIncome || 0} />


      <RecentIncome
        transactions= {dashboardData?.last60DaysIncome?.transactions || []}
        onSeeMore={() => navigate("/income")} />

       
      

        </div>

        </div>
    </DashboardLayout>
  )
}

export default Home
