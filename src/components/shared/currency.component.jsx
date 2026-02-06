"use client";

import { CURRENCY } from "../../constants/constant";
import { useCurrency } from "../../hooks/currency.hook";
import { Button, Dropdown } from '@/components/ui';
import React from "react";
import { DollarSign } from "lucide-react";

const AppCurrency = () => {
  const { setCurrencyFun, currency: currencyVal } = useCurrency();

  const items = [
    { label: `USD (${CURRENCY.usd})`, key: CURRENCY.usd },
    { label: `XAF (${CURRENCY.cfa})`, key: CURRENCY.cfa },
  ];

  const handleMenuClick = (e) => {
    if (e?.key) {
      setCurrencyFun(e.key);
    }
  };

  const selectedCurrency = items.find((item) => item.key === currencyVal) || items[1];

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      placement="bottomLeft"
    >
      <Button 
        type="text" 
        size="sm" 
        className="h-9 px-2 gap-1.5"
        icon={<DollarSign size={16} />}
      >
        <span className="hidden sm:inline">{selectedCurrency.key}</span>
        <span className="sm:hidden">{selectedCurrency.key}</span>
      </Button>
    </Dropdown> 
  );
};

export default AppCurrency;