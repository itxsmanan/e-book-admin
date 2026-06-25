import React, { useState } from "react";
import { useAdminAuth } from "../context/AuthContext";
import type { User } from "../context/AuthContext";
import { CloseIcon, SearchIcon, TrashIcon } from "./Icons";
import { statusBadge, tw } from "./adminTailwind";

type SubscriptionName = User["subscription"];

const avatarOptions = [
  "Reader",
  "Writer",
  "Teacher",
  "Business",
  "Student",
  "Author",
];

export const UsersTab: React.FC = () => {
  const { users, toggleUserStatus, deleteUser, addUser, booksList } = useAdminAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<User["role"]>("User");
  const [newUserSub, setNewUserSub] = useState<SubscriptionName>("None");
  const [newUserAvatar, setNewUserAvatar] = useState("Reader");

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term);
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getBookTitle = (bookId: number) => {
    const book = booksList.find((b) => b.id === bookId);
    return book ? book.title : `Book #${bookId}`;
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    addUser({
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      subscription: newUserSub,
      status: "Active",
      avatar: newUserAvatar,
      purchasedBooks: [],
    });

    setNewUserName("");
    setNewUserEmail("");
    setNewUserRole("User");
    setNewUserSub("None");
    setNewUserAvatar("Reader");
    setShowAddModal(false);
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <SearchIcon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim"
          />
          <input
            className={`${tw.input} pl-11`}
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:w-auto">
          <select className={tw.select} value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          <select
            className={tw.select}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
          <button className={tw.primaryBtn} onClick={() => setShowAddModal(true)} type="button">
            Add User
          </button>
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-text-main/10 bg-slate/40 shadow-[0_16px_42px_rgba(0,0,0,0.16)] lg:block">
        <table className="w-full text-left">
          <thead className="bg-midnight/45 text-xs uppercase tracking-wider text-text-dim">
            <tr>
              {["User", "Role", "Joined", "Subscription", "Status", "Actions"].map((head) => (
                <th key={head} className="px-5 py-4 font-extrabold last:text-right">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="transition hover:bg-text-main/[0.03]">
                <td className="px-5 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-text-main/10 bg-navy/40 text-xs font-black text-gold-bright">
                      {user.avatar.slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-text-main">{user.name}</p>
                      <p className="break-all text-xs text-text-dim">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`${tw.badge} ${tw.neutralBadge}`}>{user.role}</span>
                </td>
                <td className="px-5 py-4 text-sm text-text-dim">{user.joinedDate}</td>
                <td className="px-5 py-4 text-sm text-text-main">{user.subscription}</td>
                <td className="px-5 py-4">
                  <span className={statusBadge(user.status)}>{user.status}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button className={tw.secondaryBtn} onClick={() => setSelectedUser(user)}>
                      Details
                    </button>
                    <button
                      className={user.status === "Active" ? tw.dangerBtn : tw.secondaryBtn}
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.status === "Active" ? "Suspend" : "Activate"}
                    </button>
                    <button className={tw.dangerIconBtn} onClick={() => deleteUser(user.id)}>
                      <TrashIcon size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 lg:hidden">
        {filteredUsers.map((user) => (
          <article key={user.id} className={`${tw.card} p-4`}>
            <div className="flex gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-text-main/10 bg-navy/40 text-xs font-black text-gold-bright">
                {user.avatar.slice(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-extrabold text-text-main">{user.name}</h3>
                <p className="break-all text-sm text-text-dim">{user.email}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-midnight/25 p-3">
                <span className="block text-xs uppercase text-text-dim">Role</span>
                <strong>{user.role}</strong>
              </div>
              <div className="rounded-xl bg-midnight/25 p-3">
                <span className="block text-xs uppercase text-text-dim">Plan</span>
                <strong>{user.subscription}</strong>
              </div>
              <div className="rounded-xl bg-midnight/25 p-3">
                <span className="block text-xs uppercase text-text-dim">Joined</span>
                <strong>{user.joinedDate}</strong>
              </div>
              <div className="rounded-xl bg-midnight/25 p-3">
                <span className="block text-xs uppercase text-text-dim">Status</span>
                <span className={statusBadge(user.status)}>{user.status}</span>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button className={tw.secondaryBtn} onClick={() => setSelectedUser(user)}>
                Details
              </button>
              <button
                className={user.status === "Active" ? tw.dangerBtn : tw.secondaryBtn}
                onClick={() => toggleUserStatus(user.id)}
              >
                {user.status === "Active" ? "Suspend" : "Activate"}
              </button>
            </div>
          </article>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="rounded-2xl border border-text-main/10 bg-slate/40 p-10 text-center text-text-dim">
          No users found matching filters.
        </div>
      )}

      {selectedUser && (
        <div className={tw.modalOverlay} onClick={() => setSelectedUser(null)}>
          <div className={tw.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={tw.modalHeader}>
              <h3 className={tw.modalTitle}>User Profile Details</h3>
              <button className={tw.iconBtn} onClick={() => setSelectedUser(null)}>
                <CloseIcon size={20} />
              </button>
            </div>
            <div className={tw.modalBody}>
              <div className="flex flex-col gap-4 rounded-2xl border border-text-main/10 bg-midnight/25 p-4 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-sm font-black text-gold-bright">
                  {selectedUser.avatar.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xl font-black text-text-main">{selectedUser.name}</h4>
                  <p className="break-all text-sm text-text-dim">{selectedUser.email}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className={`${tw.badge} ${tw.neutralBadge}`}>{selectedUser.role}</span>
                    <span className={statusBadge(selectedUser.status)}>{selectedUser.status}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["User ID", selectedUser.id],
                  ["Security Role", selectedUser.role],
                  ["Joined Date", selectedUser.joinedDate],
                  ["Subscription Tier", selectedUser.subscription],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-text-main/10 bg-midnight/25 p-4">
                    <span className="text-xs font-extrabold uppercase text-text-dim">{label}</span>
                    <p className="mt-1 font-bold text-text-main">{value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-text-main/10 bg-midnight/25 p-4">
                <span className="text-xs font-extrabold uppercase text-text-dim">
                  Purchased / Borrowed Books ({selectedUser.purchasedBooks.length})
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedUser.purchasedBooks.length > 0 ? (
                    selectedUser.purchasedBooks.map((bId) => (
                      <span key={bId} className={`${tw.badge} ${tw.neutralBadge}`}>
                        {getBookTitle(bId)}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-text-dim">No books purchased or checked out.</p>
                  )}
                </div>
              </div>
            </div>
            <div className={tw.modalFooter}>
              <button className={tw.secondaryBtn} onClick={() => setSelectedUser(null)}>
                Close
              </button>
              <button
                className={selectedUser.status === "Active" ? tw.dangerBtn : tw.primaryBtn}
                onClick={() => {
                  toggleUserStatus(selectedUser.id);
                  setSelectedUser({
                    ...selectedUser,
                    status: selectedUser.status === "Active" ? "Suspended" : "Active",
                  });
                }}
              >
                {selectedUser.status === "Active" ? "Suspend Account" : "Activate Account"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className={tw.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div className={tw.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={tw.modalHeader}>
              <h3 className={tw.modalTitle}>Create User Account</h3>
              <button className={tw.iconBtn} onClick={() => setShowAddModal(false)}>
                <CloseIcon size={20} />
              </button>
            </div>
            <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleAddUserSubmit}>
              <div className={tw.modalBody}>
                <label className={tw.field}>
                  <span>Full Name</span>
                  <input
                    className={tw.input}
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    required
                  />
                </label>
                <label className={tw.field}>
                  <span>Email Address</span>
                  <input
                    className={tw.input}
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    required
                  />
                </label>
                <label className={tw.field}>
                  <span>Avatar Label</span>
                  <select className={tw.select} value={newUserAvatar} onChange={(e) => setNewUserAvatar(e.target.value)}>
                    {avatarOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className={tw.field}>
                    <span>Security Role</span>
                    <select
                      className={tw.select}
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value as User["role"])}
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </label>
                  <label className={tw.field}>
                    <span>Subscription Tier</span>
                    <select
                      className={tw.select}
                      value={newUserSub}
                      onChange={(e) => setNewUserSub(e.target.value as SubscriptionName)}
                    >
                      <option value="None">None</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Half-Yearly">Half-Yearly</option>
                      <option value="9-Month Plan">9-Month Plan</option>
                      <option value="Annual">Annual</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className={tw.modalFooter}>
                <button className={tw.secondaryBtn} type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button className={tw.primaryBtn} type="submit">
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
