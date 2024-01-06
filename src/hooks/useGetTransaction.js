import { useEffect, useState } from "react";
import { query,collection, onSnapshot,where,orderBy } from "firebase/firestore";
import {db} from '../config/firebase-config';
import { useGetUserInfo } from "./useGetUserInfo";

export  const useGetTransaction =()=>{
     const [transaction,setTransaction]=useState([]);
     const [transactionTotals,setTransactionTotals]=useState({balance:0.0,income:0.0,expenses:0.0})
     const transactionCollectionRef=collection(db,"transactions");
     const {userID}=useGetUserInfo()
     let unsubscribe;
     const getTransactions=async()=>{
        try{
           const queryTransactions = query(transactionCollectionRef,where("userID","==",userID),orderBy("createdAt"));
           onSnapshot(queryTransactions,(snapshot)=>{
            let docs=[];
            let totalIncome=0;
            let totalExpenses=0;

           unsubscribe= snapshot.forEach((doc)=>{
                const data=doc.data();
                const id=doc.id
                docs.push({...data,id});

                if(data.transactionType ==="expense"){
                  totalExpenses +=Number(data.transactionAmount);
                }
                else{
                  totalIncome +=Number(data.transactionAmount);
                }
            });
            setTransaction(docs);
            let balance=totalIncome-totalExpenses;
            setTransactionTotals({
               balance:balance,
               Expenses:totalExpenses,
               Income:totalIncome,
            })
           })
        }catch(err){
            console.error(err);
        }
        return ()=>unsubscribe();
     }

     useEffect(()=>{
        getTransactions();
     },[])
    return {transaction,transactionTotals};
}