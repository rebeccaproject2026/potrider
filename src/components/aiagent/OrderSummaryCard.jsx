/**
 * Reusable order summary card - blue block for use inside chat (product list + financial breakdown + Human Response).
 */
const OrderSummaryCard = ({ products = [], subtotal, promocode, discount, potCash, storeDiscount, total, timestamp, showHumanResponse }) => {
  return (
    <div className="max-w-[85%] ml-auto rounded-lg overflow-hidden bg-(--color-secondary) text-white">
      <div className="p-4">
        {products.map((p, i) => (
          <div key={i} className="flex gap-3 py-3 border-b border-blue-400/30 last:border-b-0">
            <div className="w-14 h-14 rounded bg-white/20 shrink-0 overflow-hidden">
              {p.image ? (
                <img src={p.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/60 text-xs">Img</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{p.name}</p>
              <p className="text-xs text-blue-100">Qty: {p.qty}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[11px] text-blue-100">Items</p>
              <p className="font-medium text-sm">{p.items}</p>
              <p className="text-[11px] text-blue-100 mt-1">Total</p>
              <p className="font-medium text-sm">{p.total}</p>
            </div>
          </div>
        ))}
        <div className="pt-3 space-y-1 text-sm">
          {subtotal != null && <div className="flex justify-between"><span className="text-blue-100">Subtotal:</span> <span>{subtotal}</span></div>}
          {promocode != null && <div className="flex justify-between"><span className="text-blue-100">Promocode:</span> <span>{promocode}</span></div>}
          {discount != null && <div className="flex justify-between"><span className="text-blue-100">Discount:</span> <span>{discount}</span></div>}
          {potCash != null && <div className="flex justify-between"><span className="text-blue-100">Pot Cash:</span> <span>{potCash}</span></div>}
          {storeDiscount != null && <div className="flex justify-between"><span className="text-blue-100">Store Discount:</span> <span>{storeDiscount}</span></div>}
          {total != null && <div className="flex justify-between font-bold text-base pt-2 border-t border-blue-400/30 mt-2"><span>Total:</span> <span>{total}</span></div>}
        </div>
        <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-blue-400/30">
          <span className="text-[11px] text-blue-100">{timestamp}</span>
          {showHumanResponse !== false && (
            <button
              type="button"
              className="text-[11px] font-medium px-2 py-1 rounded bg-white text-(--color-secondary) hover:bg-blue-50"
            >
              Human Response
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
