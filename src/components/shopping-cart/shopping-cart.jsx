"use client";

import {
  Badge,
  Button,
  List,
  message,
  Popover,
  Typography,
} from "@/components/ui";
import { ShoppingCart as ShoppingCartIcon, Trash2, Plus, Minus } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { API_URL_UPLOADS_CROCHETS } from "../../constants/api-url";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { format } from "../../lib/format";
import { useCart } from "../../hooks/cart.hook";
import { CURRENCY } from "../../constants/constant";

function CartItemThumbnail({ src, alt, className }) {
  const [error, setError] = useState(false);
  const fallback = alt ? alt.charAt(0).toUpperCase() : "?";
  if (error || !src) {
    return (
      <div className={cn(className, "flex items-center justify-center bg-gray-200 text-gray-600 text-lg font-semibold")}>
        {fallback}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt || ""}
      className={className}
      onError={() => setError(true)}
    />
  );
}

const ShoppingCart = ({ cartCount = 0, cartItems: initialCartItems = [], onCartUpdate }) => {
  const [popovervisible, setPopovervisible] = useState(false);
  const navigator = useRouter();
  const { removeCrochet, updateQuantity, loadCartCrochets } = useCart();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [updatingItems, setUpdatingItems] = useState(new Set());
  const onCartUpdateRef = useRef(onCartUpdate);
  onCartUpdateRef.current = onCartUpdate;

  // Sync with parent cartItems when they change (e.g. initial load)
  useEffect(() => {
    setCartItems(initialCartItems);
  }, [initialCartItems]);

  // Reload cart items only when popover opens (stable deps to avoid re-run loop)
  useEffect(() => {
    if (!popovervisible) return;
    let cancelled = false;
    loadCartCrochets().then((items) => {
      if (cancelled) return;
      setCartItems(items);
      onCartUpdateRef.current?.(items);
    });
    return () => { cancelled = true; };
  }, [popovervisible]);

  const handleCheckoutSubmit = () => {
    navigator.push("/cart");
    setPopovervisible(false);
  };

  const handleRemoveCartItem = async (item) => {
    const feedback = await removeCrochet(item.crochet.id);
    if (feedback) {
      message.success(`${item.crochet.name} has been removed from cart`);
      // Reload cart items
      const items = await loadCartCrochets();
      setCartItems(items);
      // Notify parent to refresh
      if (onCartUpdate) {
        onCartUpdate(items);
      }
    } else {
      message.error(`${item.crochet.name} was not removed`);
    }
  };

  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveCartItem(item);
      return;
    }

    const itemKey = item.id || `${item.crochetId || item.crochet.id}-${item.sizeId}`;
    setUpdatingItems((prev) => new Set(prev).add(itemKey));

    try {
      const success = await updateQuantity(
        item.id,
        newQuantity,
        item.crochetId || item.crochet.id,
        item.sizeId,
        item.currency,
        item.selectedColors || item.color
      );

      if (success) {
        // Reload cart items to get updated prices
        const items = await loadCartCrochets();
        setCartItems(items);
        // Notify parent to refresh
        if (onCartUpdate) {
          onCartUpdate(items);
        }
      } else {
        message.error("Failed to update quantity");
      }
    } catch (error) {
      message.error("Failed to update quantity");
    } finally {
      setUpdatingItems((prev) => {
        const next = new Set(prev);
        next.delete(itemKey);
        return next;
      });
    }
  };

  const CartHolder = () => {
    if (!cartItems || cartItems.length === 0) {
      return (
        <div className="p-8 text-center">
          <ShoppingCartIcon size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      );
    }

    return (
      <div className="w-full max-w-md">
        <List
          itemLayout="horizontal"
          dataSource={cartItems}
          className="max-h-[50vh] overflow-y-auto"
          renderItem={(item, index) => {
            return (
              <List.Item
                onClick={(e) => e.stopPropagation()}
                rowKey={item.id + index}
                key={item.id + index}
                actions={[
                  <Button
                    key={"button-1"}
                    type="text"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    icon={<Trash2 size={16} />}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleRemoveCartItem(item);
                    }}
                    htmlType="button"
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <CartItemThumbnail
                      src={`${API_URL_UPLOADS_CROCHETS}/${item.crochet.imageUrls[0]}`}
                      alt={item.crochet.name}
                      className="w-16 h-16 rounded-full object-cover bg-gray-100 shrink-0 overflow-hidden flex items-center justify-center text-gray-400 font-semibold"
                    />
                  }
                  title={
                    <Typography.Title level={5} className="mb-1">
                      {item.crochet.name}
                    </Typography.Title>
                  }
                  description={
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Qty:</span>
                        <div className="flex items-center gap-1 border border-gray-200 rounded">
                          <Button
                            type="text"
                            size="small"
                            className="p-1 h-6 w-6 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                            icon={<Minus className="w-3 h-3" />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(item, item.quantity - 1);
                            }}
                            disabled={updatingItems.has(item.id || `${item.crochetId || item.crochet.id}-${item.sizeId}`) || item.quantity <= 1}
                          />
                          <span className="px-2 text-xs font-medium min-w-[1.5rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            type="text"
                            size="small"
                            className="p-1 h-6 w-6 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                            icon={<Plus className="w-3 h-3" />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(item, item.quantity + 1);
                            }}
                            disabled={updatingItems.has(item.id || `${item.crochetId || item.crochet.id}-${item.sizeId}`)}
                          />
                        </div>
                      </div>
                      <Typography.Text
                        className="text-red-800 font-semibold text-lg"
                      >
                        {item.currency === CURRENCY.usd && "$"}
                        {format.number(item.total)}{" "}
                        {item.currency === CURRENCY.cfa ? "XAF" : ""}
                      </Typography.Text>
                    </div>
                  }
                />
              </List.Item>
            );
          }}
        />

        {cartItems && cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-100">
            <Button
              type="primary"
              size="large"
              onClick={() => handleCheckoutSubmit()}
              className="w-full rounded-lg font-semibold"
              htmlType="button"
            >
              View Cart ({cartItems.length})
            </Button>
          </div>
        )}
      </div>
    );
  };

  const popoverContent = useMemo(() => <CartHolder />, [cartItems, updatingItems]);

  return (
    <Popover
      placement="bottom"
      title="Your Cart"
      content={popoverContent}
      trigger="click"
      open={popovervisible}
      onOpenChange={setPopovervisible}
    >
      <div className="relative cursor-pointer">
        <Badge count={cartCount}>
          <div className="p-2 hover:bg-gray-50 rounded-md transition-colors">
            <ShoppingCartIcon 
              className="text-gray-700" 
              size={24} 
            />
          </div>
        </Badge>
      </div>
    </Popover>
  );
};

export default ShoppingCart;
