
import React, { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Lock } from "lucide-react";
import { toast } from "sonner";

export const AdminLogin: React.FC = () => {
  const { isAdmin, login, logout } = useAdmin();
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast.success("Logged in as admin");
      setPassword("");
      setOpen(false);
    } else {
      toast.error("Incorrect password");
    }
  };

  if (isAdmin) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-300 dark:border-green-800"
        onClick={logout}
      >
        <Lock size={16} /> Admin Mode (Click to Logout)
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Lock size={16} /> Admin Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Admin Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
