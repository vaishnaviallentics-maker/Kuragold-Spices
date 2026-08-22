export function PriceDisplay({ price }: { price: number }) {
  return (
    <p className="font-body text-2xl font-bold text-maroon">
      ₹{price.toLocaleString('en-IN')}
    </p>
  )
}

