"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Check, X, Search, Filter, MoreHorizontal, Loader2, UserCheck, UserX, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

interface User {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  role_id: number | null
  status: string | null
  created_at: string
  roles: {
    id: number
    name: string
  } | null
}

interface Role {
  id: number
  name: string
}

interface UserManagementProps {
  initialUsers: User[]
  totalUsers: number
  roles: Role[]
  currentFilter: string
  currentPage: number
  currentSearch: string
  pageSize: number
}

export function UserManagement({
  initialUsers,
  totalUsers,
  roles,
  currentFilter,
  currentPage,
  currentSearch,
  pageSize,
}: UserManagementProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [filter, setFilter] = useState(currentFilter)
  const [page, setPage] = useState(currentPage)
  const [search, setSearch] = useState(currentSearch)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [dialogAction, setDialogAction] = useState<"approve" | "reject" | "changeRole" | null>(null)
  const [selectedRole, setSelectedRole] = useState<number | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const totalPages = Math.ceil(totalUsers / pageSize)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/admin/users?filter=${filter}&search=${search}&page=1`)
  }

  const handleFilterChange = (value: string) => {
    setFilter(value)
    router.push(`/admin/users?filter=${value}&search=${search}&page=1`)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    router.push(`/admin/users?filter=${filter}&search=${search}&page=${newPage}`)
  }

  const openDialog = (user: User, action: "approve" | "reject" | "changeRole") => {
    setSelectedUser(user)
    setDialogAction(action)
    if (action === "changeRole") {
      setSelectedRole(user.role_id)
    }
  }

  const closeDialog = () => {
    setSelectedUser(null)
    setDialogAction(null)
    setSelectedRole(null)
  }

  const handleApproveUser = async () => {
    if (!selectedUser) return

    setIsLoading(true)
    try {
      const { error } = await supabase.from("profiles").update({ status: "active" }).eq("id", selectedUser.id)

      if (error) throw error

      // Log activity
      await supabase.from("admin_activities").insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        user_name: "Administrator",
        action: `Approved user: ${selectedUser.email}`,
      })

      toast({
        title: "User approved",
        description: "The user has been approved successfully.",
      })

      // Update local state
      setUsers(users.map((user) => (user.id === selectedUser.id ? { ...user, status: "active" } : user)))

      closeDialog()
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error approving user",
        description: error.message || "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRejectUser = async () => {
    if (!selectedUser) return

    setIsLoading(true)
    try {
      const { error } = await supabase.from("profiles").update({ status: "rejected" }).eq("id", selectedUser.id)

      if (error) throw error

      // Log activity
      await supabase.from("admin_activities").insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        user_name: "Administrator",
        action: `Rejected user: ${selectedUser.email}`,
      })

      toast({
        title: "User rejected",
        description: "The user has been rejected successfully.",
      })

      // Update local state
      setUsers(users.map((user) => (user.id === selectedUser.id ? { ...user, status: "rejected" } : user)))

      closeDialog()
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error rejecting user",
        description: error.message || "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangeRole = async () => {
    if (!selectedUser || !selectedRole) return

    setIsLoading(true)
    try {
      const { error } = await supabase.from("profiles").update({ role_id: selectedRole }).eq("id", selectedUser.id)

      if (error) throw error

      // Get role name
      const { data: roleData } = await supabase.from("roles").select("name").eq("id", selectedRole).single()

      // Log activity
      await supabase.from("admin_activities").insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        user_name: "Administrator",
        action: `Changed role for ${selectedUser.email} to ${roleData?.name || "unknown"}`,
      })

      toast({
        title: "Role updated",
        description: "The user's role has been updated successfully.",
      })

      // Update local state
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                role_id: selectedRole,
                roles: { id: selectedRole, name: roleData?.name || "" },
              }
            : user,
        ),
      )

      closeDialog()
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error updating role",
        description: error.message || "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </form>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter users" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="pending">Pending Approval</SelectItem>
              <SelectItem value="active">Active Users</SelectItem>
              <SelectItem value="suspended">Suspended Users</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.first_name} {user.last_name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.roles?.name || "No role"}</Badge>
                  </TableCell>
                  <TableCell>
                    {user.status === "pending" ? (
                      <Badge variant="secondary">Pending</Badge>
                    ) : user.status === "active" ? (
                      <Badge variant="default">Active</Badge>
                    ) : user.status === "suspended" ? (
                      <Badge variant="destructive">Suspended</Badge>
                    ) : user.status === "rejected" ? (
                      <Badge variant="outline">Rejected</Badge>
                    ) : (
                      <Badge variant="outline">Unknown</Badge>
                    )}
                  </TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {user.status === "pending" && (
                          <>
                            <DropdownMenuItem onClick={() => openDialog(user, "approve")}>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDialog(user, "reject")}>
                              <UserX className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        <DropdownMenuItem onClick={() => openDialog(user, "changeRole")}>
                          <Shield className="mr-2 h-4 w-4" />
                          Change Role
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </div>
          <Button variant="outline" size="sm" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      )}

      {/* Approve User Dialog */}
      <Dialog open={dialogAction === "approve"} onOpenChange={() => closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve User</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this user? They will be able to access the system.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm font-medium">User Details:</p>
            <p className="text-sm">
              {selectedUser?.first_name} {selectedUser?.last_name} ({selectedUser?.email})
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button onClick={handleApproveUser} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Approving...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject User Dialog */}
      <Dialog open={dialogAction === "reject"} onOpenChange={() => closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject User</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this user? They will not be able to access the system.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm font-medium">User Details:</p>
            <p className="text-sm">
              {selectedUser?.first_name} {selectedUser?.last_name} ({selectedUser?.email})
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectUser} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Rejecting...
                </>
              ) : (
                <>
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Role Dialog */}
      <Dialog open={dialogAction === "changeRole"} onOpenChange={() => closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>
              Select a new role for this user. This will change their permissions in the system.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <p className="text-sm font-medium">User Details:</p>
              <p className="text-sm">
                {selectedUser?.first_name} {selectedUser?.last_name} ({selectedUser?.email})
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Select Role:</p>
              <Select
                value={selectedRole?.toString()}
                onValueChange={(value) => setSelectedRole(Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id.toString()}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button onClick={handleChangeRole} disabled={isLoading || !selectedRole}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
