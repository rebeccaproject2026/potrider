import React from 'react'
import { Link } from 'react-router-dom'
import { useCallback,useState } from 'react'
import DatePickerMap from '../../components/DatePickerMap'
import FinanceSummaryCard from '../../components/finances/FinanceSummaryCard';


const CARD_DATA = [
  {
    title: "Total Orders",
    value: "10,650",
    change: "+ 22%",
    isPositive: true,
  },
  {
    title: "Orders Delivered",
    value: "9825",
    change: "- 22%",
    isPositive: false,
  },
  { title: "Orders Canceled", value: "102", change: "+ 22%", isPositive: true },
 {
    title: "Orders Rescheduled",
    value: "135",
    change: "+ 22%",
    isPositive: false,
  }
];
const Drivers = () => {
    const [period, setPeriod] = useState({ start: null, end: null });

  const onDateUpdate = useCallback(
      ({ start, end }) => setPeriod({ start, end }),
      []
    );
  return (
    <div className="flex flex-col gap-3 min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <DatePickerMap defaultItem={2} onUpdate={onDateUpdate} />
        <Link
          to="/inventory/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-(--color-primary) text-white rounded-sm hover:opacity-90 font-semibold text-sm"
        >
          <span className="text-lg leading-none">+</span>
          Add Inventory
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CARD_DATA.map((card) => (
          <FinanceSummaryCard
            key={card.title}
            title={card.title}
            value={card.value}
            change={card.change}
            isPositive={card.isPositive}
          />
        ))}
      </div>
       {/* <div className="min-w-0 bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-sm bg-white focus:outline-none"
              />
            </div>
            <div className="flex w-full rounded-sm overflow-hidden border border-gray-200 bg-white">
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setStatusTab(tab.key)}
                  className={`px-2 py-1.5 w-full text-sm m-1 rounded ronded-2xl font-medium whitespace-nowrap ${statusTab === tab.key
                    ? "bg-(--color-secondary) text-white"
                    : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
            <button
              type="button"
              className="p-2.5 rounded-md bg-gray-700 text-white hover:bg-gray-800"
              title="Filter"
            >
              <Filter className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-2.5 rounded-md bg-(--color-primary) text-white hover:opacity-90"
              title="Export"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

     

       
      </div> */}
      </div>
  )
}

export default Drivers
