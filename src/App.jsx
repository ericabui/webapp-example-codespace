import { useState } from 'react'

const price = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function App() {
  const [amount, setAmount] = useState('')
  const [discount, setDiscount] = useState('')

  const amountNumber = Number.parseFloat(amount)
  const discountNumber = Number.parseFloat(discount)

  const hasAmount = Number.isFinite(amountNumber) && amountNumber >= 0
  const hasDiscount =
    Number.isFinite(discountNumber) && discountNumber >= 0 && discountNumber <= 100

  const saved = hasAmount && hasDiscount ? amountNumber * (discountNumber / 100) : 0
  const finalPrice = hasAmount && hasDiscount ? amountNumber - saved : 0

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
        <h1 className="text-3xl font-bold tracking-tight">Discount Calculator</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Enter the original price and the discount percentage.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Original amount
            </span>
            <div className="flex items-center rounded-lg ring-1 ring-slate-300 focus-within:ring-2 focus-within:ring-pink-500 dark:ring-slate-600">
              <span className="pl-4 text-slate-400">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                placeholder="100.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg bg-transparent px-2 py-2.5 text-lg outline-none"
              />
            </div>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Discount
            </span>
            <div className="flex items-center rounded-lg ring-1 ring-slate-300 focus-within:ring-2 focus-within:ring-pink-500 dark:ring-slate-600">
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                inputMode="decimal"
                placeholder="25"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full rounded-lg bg-transparent px-4 py-2.5 text-lg outline-none"
              />
              <span className="pr-4 text-slate-400">%</span>
            </div>
          </label>

          {amount !== '' && !hasAmount && (
            <p className="text-sm text-red-600 dark:text-red-400">
              Please enter a valid amount of 0 or more.
            </p>
          )}
          {discount !== '' && !hasDiscount && (
            <p className="text-sm text-red-600 dark:text-red-400">
              Discount must be between 0 and 100.
            </p>
          )}
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-900/40 dark:ring-slate-700">
          <div className="flex items-baseline justify-between">
            <span className="text-slate-500 dark:text-slate-400">You save</span>
            <span className="text-lg font-medium text-pink-600 dark:text-pink-400">
              {price.format(saved)}
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between border-t border-slate-200 pt-2 dark:border-slate-700">
            <span className="font-medium">Final price</span>
            <span className="text-3xl font-bold">{price.format(finalPrice)}</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400">
        Tip: leave the percent empty to see the original price.
      </p>
    </main>
  )
}

export default App
