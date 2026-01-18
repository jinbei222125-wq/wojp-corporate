import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, MapPin, Briefcase, Banknote } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface JobFormData {
  positionName: string;
  description: string;
  requirements: string;
  location: string;
  salary: string;
  isActive: boolean;
}

export default function RecruitAdmin() {
  const utils = trpc.useUtils();
  const { data: jobsList, isLoading } = trpc.jobPositions.listAll.useQuery();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<JobFormData>({
    positionName: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    isActive: true,
  });

  const createMutation = trpc.jobPositions.create.useMutation({
    onSuccess: () => {
      utils.jobPositions.listAll.invalidate();
      toast.success("募集職種を作成しました");
      resetForm();
    },
    onError: (error) => {
      toast.error(`エラー: ${error.message}`);
    },
  });

  const updateMutation = trpc.jobPositions.update.useMutation({
    onSuccess: () => {
      utils.jobPositions.listAll.invalidate();
      toast.success("募集職種を更新しました");
      resetForm();
    },
    onError: (error) => {
      toast.error(`エラー: ${error.message}`);
    },
  });

  const deleteMutation = trpc.jobPositions.delete.useMutation({
    onSuccess: () => {
      utils.jobPositions.listAll.invalidate();
      toast.success("募集職種を削除しました");
    },
    onError: (error) => {
      toast.error(`エラー: ${error.message}`);
    },
  });

  const resetForm = () => {
    setFormData({
      positionName: "",
      description: "",
      requirements: "",
      location: "",
      salary: "",
      isActive: true,
    });
    setEditingId(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (job: typeof jobsList extends (infer T)[] | undefined ? T : never) => {
    if (!job) return;
    setFormData({
      positionName: job.positionName,
      description: job.description,
      requirements: job.requirements,
      location: job.location,
      salary: job.salary,
      isActive: job.isActive === 1,
    });
    setEditingId(job.id);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      updateMutation.mutate({
        id: editingId,
        ...formData,
        isActive: formData.isActive ? 1 : 0,
      });
    } else {
      createMutation.mutate({
        ...formData,
        isActive: formData.isActive ? 1 : 0,
      });
    }
  };

  const toggleActive = (job: typeof jobsList extends (infer T)[] | undefined ? T : never) => {
    if (!job) return;
    updateMutation.mutate({
      id: job.id,
      isActive: job.isActive === 1 ? 0 : 1,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-white">採用情報管理</h1>
            <p className="text-gray-400 mt-2">募集職種の投稿・編集</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!open) resetForm(); setIsDialogOpen(open); }}>
            <DialogTrigger asChild>
              <Button className="bg-brass text-anthracite hover:bg-brass-light">
                <Plus size={20} className="mr-2" />
                新規作成
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-anthracite border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white font-display text-xl">
                  {editingId ? "募集職種編集" : "募集職種新規作成"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                {/* Position Name */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">ポジション名</label>
                  <Input
                    value={formData.positionName}
                    onChange={(e) => setFormData({ ...formData, positionName: e.target.value })}
                    placeholder="例: キャリアアドバイザー"
                    className="bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">業務内容</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="業務内容を入力..."
                    className="bg-white/5 border-white/10 text-white min-h-[120px]"
                    required
                  />
                </div>

                {/* Requirements */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">応募資格</label>
                  <Textarea
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="応募資格を入力..."
                    className="bg-white/5 border-white/10 text-white min-h-[120px]"
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">勤務地</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="例: 東京都渋谷区（リモート可）"
                    className="bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>

                {/* Salary */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">給与</label>
                  <Input
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="例: 月給25万円〜50万円（経験・能力による）"
                    className="bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>

                {/* Active Status */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <label className="text-sm text-white">公開ステータス</label>
                    <p className="text-xs text-gray-500 mt-1">オフにすると求人ページに表示されません</p>
                  </div>
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                </div>

                {/* Submit */}
                <div className="flex gap-3 justify-end">
                  <Button type="button" variant="outline" onClick={resetForm} className="border-white/20 text-gray-400 hover:text-white">
                    キャンセル
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-brass text-anthracite hover:bg-brass-light"
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {createMutation.isPending || updateMutation.isPending ? "保存中..." : (editingId ? "更新" : "作成")}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Jobs List */}
        <div className="bg-anthracite border border-white/10 rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-brass border-t-transparent rounded-full mx-auto" />
            </div>
          ) : jobsList && jobsList.length > 0 ? (
            <div className="divide-y divide-white/10">
              {jobsList.map((job) => (
                <div key={job.id} className="p-6 hover:bg-white/5 transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Status Indicator */}
                    <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${job.isActive ? "bg-green-400" : "bg-gray-500"}`} />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-medium">{job.positionName}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${job.isActive ? "text-green-400 bg-green-500/10" : "text-gray-400 bg-gray-500/10"}`}>
                          {job.isActive ? "公開中" : "非公開"}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Banknote size={14} />
                          {job.salary}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mt-2 line-clamp-2">{job.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={job.isActive === 1}
                        onCheckedChange={() => toggleActive(job)}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(job)}
                        className="text-gray-400 hover:text-white hover:bg-white/10"
                      >
                        <Pencil size={18} />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-anthracite border-white/10">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">削除の確認</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400">
                              「{job.positionName}」を削除しますか？この操作は取り消せません。
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-white/20 text-gray-400 hover:text-white">
                              キャンセル
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate({ id: job.id })}
                              className="bg-red-500 text-white hover:bg-red-600"
                            >
                              削除
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Briefcase size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400">まだ募集職種がありません</p>
              <p className="text-gray-500 text-sm mt-2">「新規作成」ボタンから最初の募集職種を追加しましょう</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
