import { useEffect, useState } from 'react'
import { DollarSign, Home, CheckSquare, TrendingUp } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import axios from 'axios'

const mockChartData = [
  { month: 'Jul 2025', earnings: 1200 },
  { month: 'Aug 2025', earnings: 1800 },
  { month: 'Sep 2025', earnings: 2400 },
  { month: 'Oct 2025', earnings: 2100 },
  { month: 'Nov 2025', earnings: 3200 },
  { month: 'Dec 2025', earnings: 4500 },
  { month: 'Jan 2026', earnings: 3800 },
  { month: 'Feb 2026', earnings: 4200 },
  { month: 'Mar 2026', earnings: 5100 },
  { month: 'Apr 2026', earnings: 4800 },
  { month: 'May 2026', earnings: 6200 },
  { month: 'Jun 2026', earnings: 7500 }
]

const mockSummary = {
  totalEarnings: 49300,
  totalProperties: 8,
  totalBookings: 34
}

function OwnerAnalytics() {
  const [summary, setSummary] = useState(null)
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/owner/analytics`, config)
        if (res.data) {
          setSummary({
            totalEarnings: res.data.totalEarnings,
            totalProperties: res.data.totalProperties,
            totalBookings: res.data.totalBookings
          })
          setChartData(res.data.chartData || mockChartData)
        } else {
          setSummary(mockSummary)
          setChartData(mockChartData)
        }
      } catch (err) {
        setSummary(mockSummary)
        setChartData(mockChartData)
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Owner Analytics
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Track property bookings, monthly earnings, and overall portfolio performance statistics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-150 dark:border-gray-700 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-450 dark:text-gray-500 uppercase tracking-wider block">
              Total Earnings
            </span>
            <span className="text-2xl font-black text-gray-900 dark:text-white mt-1 block">
              ${summary?.totalEarnings.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-150 dark:border-gray-700 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-450 dark:text-gray-500 uppercase tracking-wider block">
              Total Properties
            </span>
            <span className="text-2xl font-black text-gray-900 dark:text-white mt-1 block">
              {summary?.totalProperties}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-150 dark:border-gray-700 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-455 dark:text-gray-500 uppercase tracking-wider block">
              Total Bookings
            </span>
            <span className="text-2xl font-black text-gray-900 dark:text-white mt-1 block">
              {summary?.totalBookings}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl border border-gray-150 dark:border-gray-700 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-gray-100 dark:border-gray-700">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Monthly Earnings Trend (Last 12 Months)
          </h2>
        </div>

        <div className="h-80 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" className="dark:stroke-gray-800" />
              <XAxis dataKey="month" stroke="#9ca3af" tickLine={false} />
              <YAxis stroke="#9ca3af" tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e5e7eb',
                  borderRadius: '12px',
                  color: '#1f2937'
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="earnings"
                name="Earnings ($)"
                stroke="#8b5cf6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorEarnings)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default OwnerAnalytics
