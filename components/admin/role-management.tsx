"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Plus, Edit, Trash2, Loader2, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface Role {
  id: number
  name: string
  description: string | null
}

interface RoleManagementProps {
  initialRoles: Role[]
}

export function RoleManagement({ initialRoles }: RoleManagementProps) {
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [roleName, setRoleName] = useState("")
  const [roleDescription, setRoleDescription] = useState("")
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const openAddDialog = () => {
    setSelectedRole(null)
    setRoleName("")
    setRoleDescription("")
    setIsDialogOpen(true)
  }

  const openEditDialog = (role: Role) => {
    setSelectedRole(role)
    setRoleName(role.name)
    setRoleDescription(role.description || "")
    setIsDialogOpen(true)
  }

  const openDeleteDialog = (role: Role) => {
    setSelectedRole(role)
    setIsDeleteDialogOpen(true)
  }

  const handleSaveRole = async () => {
    if (!roleName) return

    setIsLoading(true)
    try {
      if (selectedRole) {
        // Update existing role
        const { error } = await supabase
          .from("roles")
          .update({
            name: roleName,
            description: roleDescription || null,
          })
          .eq("id", selectedRole.id)

        if (error) throw error

        // Log activity
        await supabase.from("admin_activities").insert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          user_name: "Administrator",
          action: `Updated role: ${roleName}`,
        })

        toast({
          title: "Role updated",
          description: "The role has been updated successfully.",
        })

        // Update local state
        setRoles(
          roles.map((role) =>
            role.id === selectedRole.id ? { ...role, name: roleName, description: roleDescription || null } : role,
          ),
        )
      } else {
        // Create new role
        const { data, error } = await supabase
          .from("roles")
          .insert({
            name: roleName,
            description: roleDescription || null,
          })
          .select()

        if (error) throw error

        // Log activity
        await supabase.from("admin_activities").insert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          user_name: "Administrator",
          action: `Created role: ${roleName}`,
        })

        toast({
          title: "Role created",
          description: "The role has been created successfully.",
        })

        // Update local state
        setRoles([...roles, data[0]])
      }

      setIsDialogOpen(false)
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error saving role",
        description: error.message || "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteRole = async () => {
    if (!selectedRole) return

    setIsLoading(true)
    try {
      // Check if role is in use
      const { count, error: countError } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role_id", selectedRole.id)

      if (countError) throw countError

      if (count && count > 0) {
        throw new Error(`Cannot delete role. It is assigned to ${count} user${count === 1 ? "" : "s"}.`)
      }

      // Delete the role
      const { error } = await supabase.from("roles").delete().eq("id", selectedRole.id)

      if (error) throw error

      // Log activity
      await supabase.from("admin_activities").insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        user_name: "Administrator",
        action: `Deleted role: ${selectedRole.name}`,
      })

      toast({
        title: "Role deleted",
        description: "The role has been deleted successfully.",
      })

      // Update local state
      setRoles(roles.filter((role) => role.id !== selectedRole.id))

      setIsDeleteDialogOpen(false)
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error deleting role",
        description: error.message || "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Role
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No roles found.
                </TableCell>
              </TableRow>
            ) : (
              roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.id}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      {role.name}
                    </div>
                  </TableCell>
                  <TableCell>{role.description || "—"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(role)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDeleteDialog(role)}
                        disabled={role.id <= 3} // Prevent deleting default roles
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Role Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedRole ? "Edit Role" : "Add Role"}</DialogTitle>
            <DialogDescription>
              {selectedRole ? "Update the details for this role." : "Create a new role for users in the system."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="roleName">Role Name</Label>
              <Input
                id="roleName"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="e.g., Teacher, Student, Parent"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roleDescription">Description (Optional)</Label>
              <Input
                id="roleDescription"
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
                placeholder="Brief description of this role"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRole} disabled={isLoading || !roleName}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : selectedRole ? (
                "Update Role"
              ) : (
                "Add Role"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Role Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this role? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm font-medium">Role:</p>
            <p className="text-sm">{selectedRole?.name}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteRole} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
