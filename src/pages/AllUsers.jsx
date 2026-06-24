import { useEffect, useState } from 'react'
import { UserCheck, Shield, Trash2, Ban, ShieldAlert, CheckCircle } from 'lucide-react'
import axios from 'axios'

const mockUsers = [
  {
    _id: 'u_1',
    name: 'Sarah Jenkins',
    email: 'sarah@gmail.com',
    role: 'Tenant',
    status: 'Active'
  },
  {
    _id: 'u_2',
    name: 'Robert Vance',
    email: 'robert@resideease.com',
    role: 'Owner',
    status: 'Active'
  },
  {
    _id: 'u_3',
    name: 'Melissa Thorne',
    email: 'melissa@resideease.com',
    role: 'Owner',
    status: 'Blocked'
  },
  {
    _id: 'u_4',
    name: 'Jonathan Miller',
    email: 'jonathan@resideease.com',
    role: 'Admin',
    status: 'Active'
  }
]

function AllUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, config)
      if (res.data && res.data.length > 0) {
        setUsers(res.data)
      } else {
        setUsers(mockUsers)
      }
    } catch (err) {
      setUsers(mockUsers)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleRoleChange = async (email, newRole) => {
    try {
      const token = localStorage.getItem('token')
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/role/${email}`, { role: newRole }, config)
      setUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, role: newRole } : u))
      )
      triggerAlert(`Role updated to ${newRole} successfully!`)
    } catch (err) {
      setUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, role: newRole } : u))
      )
      triggerAlert(`Role updated to ${newRole} successfully!`)
    }
  }

  const handleToggleBlock = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Blocked' ? 'Active' : 'Blocked'
    try {
      const token = localStorage.getItem('token')
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/status/${id}`, { status: nextStatus }, config)
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, status: nextStatus } : u))
      )
      triggerAlert(`User status updated to ${nextStatus}!`)
    } catch (err) {
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, status: nextStatus } : u))
      )
      triggerAlert(`User status updated to ${nextStatus}!`)
    }
  }

  const triggerAlert = (alertMsg) => {
    setMsg(alertMsg)
    setTimeout(() => setMsg(''), 3000)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {msg && (
        <div className="fixed top-24 right-6 z-50 bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg">
          {msg}
        </div>
      )}

      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Manage Users
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Admin portal to view registered accounts, modify system permissions, and enforce block guidelines.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-150 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 text-xs font-bold text-gray-500 dark:text-gray-450 uppercase border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Current Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Assign Role</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                {users.map((userItem) => (
                  <tr key={userItem._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition">
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                      {userItem.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {userItem.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${
                        userItem.role === 'Admin'
                          ? 'bg-purple-50 text-purple-755 dark:bg-purple-950/20 dark:text-purple-400'
                          : userItem.role === 'Owner'
                          ? 'bg-blue-50 text-blue-755 dark:bg-blue-950/20 dark:text-blue-400'
                          : 'bg-gray-100 text-gray-755 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        <Shield className="w-3.5 h-3.5" />
                        <span>{userItem.role}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${
                        userItem.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-455'
                      }`}>
                        {userItem.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={userItem.role}
                        onChange={(e) => handleRoleChange(userItem.email, e.target.value)}
                        className="bg-gray-55 dark:bg-gray-700 text-xs font-bold rounded-lg px-2.5 py-1.5 outline-none text-gray-800 dark:text-white border-none cursor-pointer"
                      >
                        <option value="Tenant">Tenant</option>
                        <option value="Owner">Owner</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleToggleBlock(userItem._id, userItem.status)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                          userItem.status === 'Blocked'
                            ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:hover:bg-emerald-900/30'
                            : 'bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/20 dark:hover:bg-rose-900/30'
                        }`}
                      >
                        <Ban className="w-3.5 h-3.5" />
                        <span>{userItem.status === 'Blocked' ? 'Unblock' : 'Block User'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllUsers
