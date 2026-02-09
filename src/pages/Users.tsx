import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useUsers } from "@/hooks/useUsers";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Users as UsersIcon, Shield, ShieldCheck, ShieldX, MoreHorizontal, Search, UserCheck } from "lucide-react";
import { format } from "date-fns";

const ROLES = ["admin", "moderator", "user"] as const;

const roleBadgeVariant = (role: string) => {
  switch (role) {
    case "admin": return "destructive" as const;
    case "moderator": return "default" as const;
    default: return "secondary" as const;
  }
};

const roleIcon = (role: string) => {
  switch (role) {
    case "admin": return <ShieldCheck className="h-3 w-3" />;
    case "moderator": return <Shield className="h-3 w-3" />;
    default: return <UserCheck className="h-3 w-3" />;
  }
};

const Users = () => {
  const { users, isLoading, assignRole, removeRole } = useUsers();
  const { user: currentUser } = useAuth();
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.display_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <UsersIcon className="h-6 w-6 text-primary" />
              User Management
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage user roles and permissions
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <UsersIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{users.length}</p>
                  <p className="text-xs text-muted-foreground">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {users.filter((u) => u.roles.includes("admin")).length}
                  </p>
                  <p className="text-xs text-muted-foreground">Admins</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {users.filter((u) => u.roles.includes("moderator")).length}
                  </p>
                  <p className="text-xs text-muted-foreground">Moderators</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              Assign or remove roles to control access levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Roles</TableHead>
                      <TableHead className="hidden md:table-cell">Joined</TableHead>
                      <TableHead className="hidden md:table-cell">Last Sign In</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((u) => {
                      const isSelf = u.id === currentUser?.id;
                      return (
                        <TableRow key={u.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-foreground">{u.display_name || "Unnamed"}</p>
                              <p className="text-xs text-muted-foreground">{u.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {u.roles.length > 0 ? (
                                u.roles.map((role) => (
                                  <Badge key={role} variant={roleBadgeVariant(role)} className="gap-1 text-xs">
                                    {roleIcon(role)}
                                    {role}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-xs text-muted-foreground">No roles</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                            {format(new Date(u.created_at), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                            {u.last_sign_in_at
                              ? format(new Date(u.last_sign_in_at), "MMM d, yyyy")
                              : "Never"}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {ROLES.map((role) => {
                                  const hasRole = u.roles.includes(role);
                                  const isDisabled =
                                    (isSelf && role === "admin") ||
                                    assignRole.isPending ||
                                    removeRole.isPending;
                                  return (
                                    <DropdownMenuItem
                                      key={role}
                                      disabled={isDisabled}
                                      onClick={() =>
                                        hasRole
                                          ? removeRole.mutate({ userId: u.id, role })
                                          : assignRole.mutate({ userId: u.id, role })
                                      }
                                    >
                                      {hasRole ? (
                                        <ShieldX className="mr-2 h-4 w-4 text-destructive" />
                                      ) : (
                                        <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                                      )}
                                      {hasRole ? `Remove ${role}` : `Assign ${role}`}
                                    </DropdownMenuItem>
                                  );
                                })}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {filteredUsers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No users found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Users;
