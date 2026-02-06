import React from 'react';
import { Card, Statistic } from '@/components/ui';
// import { GrMoney } from 'react-icons/gr';
// import { TbSum } from "react-icons/tb";
import { format } from '../../lib/format';

const TransactionSummary = ({ data }) => {
  // Calculate total amount
  const totalAmount = data.reduce((sum, transaction) => {
    return sum + parseFloat(transaction.price);
  }, 0);

  // Calculate total number of transactions
  const totalTransactions = data.length;

  return (
    <div className="flex flex-wrap gap-4 mb-10">
      <Card className="flex-1 min-w-[200px] shadow-md">
        <Statistic
          title="Total Transactions"
          value={format.number(totalTransactions)}
          valueStyle={{ color: '#3f8600' }}
        //   prefix={<TbSum size={30} />}
        />
      </Card>
      
      <Card className="flex-1 min-w-[200px] shadow-md">
        <Statistic
          title="Total Amount (XAF)"
          value={format.number(totalAmount)}
          precision={2}
          valueStyle={{ color: '#1890ff' }}
        //   prefix={<GrMoney size={30} />}
          suffix="XAF"
        />
      </Card>
    </div>
  );
};

export default TransactionSummary;