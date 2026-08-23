import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User as UserIcon, Send, ThumbsUp, ThumbsDown, MessageSquare, MoreVertical, Edit2, Trash2, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export interface Comment {
  id: number;
  content: string;
  created_at: string;
  parent_id: number | null;
  is_edited: boolean;
  user_id: number;
  user_name: string;
  user_avatar: string | null;
  likes_count: number;
  dislikes_count: number;
  user_reaction: 'like' | 'dislike' | null;
}

const CommentItem = React.memo(({ 
  comment, 
  isReply = false, 
  user, 
  setAuthModalOpen, 
  onUpdate, 
  onDelete, 
  onReact, 
  onReply, 
  getReplies 
}: any) => {
  const isOwner = user?.id === comment.user_id;
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  return (
    <div className={cn("flex gap-3", isReply && "mt-4")}>
      <div className={cn("rounded-full overflow-hidden bg-white/10 shrink-0 flex items-center justify-center mt-1", isReply ? "w-8 h-8" : "w-10 h-10")}>
        {comment.user_avatar ? (
          <img src={comment.user_avatar} alt={comment.user_name} className="w-full h-full object-cover" />
        ) : (
          <UserIcon size={isReply ? 16 : 20} className="text-white/50" />
        )}
      </div>
      
      <div className="flex-1">
        {/* Comment Content */}
        <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-3 relative group">
          <div className="flex items-baseline justify-between mb-1">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-white text-sm">{comment.user_name}</span>
              <span className="text-[11px] text-neutral-500 font-medium">{formatDate(comment.created_at)}</span>
              {comment.is_edited ? <span className="text-[10px] text-neutral-600">(Đã chỉnh sửa)</span> : null}
            </div>
            
            {/* Menu */}
            {isOwner && (
              <div className="relative">
                <button onClick={() => setOpenMenu(!openMenu)} className="text-neutral-500 hover:text-white transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100">
                  <MoreVertical size={14} />
                </button>
                {openMenu && (
                  <div className="absolute right-0 top-full mt-1 bg-neutral-900 border border-white/10 rounded-lg shadow-xl overflow-hidden z-10 w-28">
                    <button onClick={() => { setIsEditing(true); setEditContent(comment.content); setOpenMenu(false); }} className="w-full text-left px-3 py-2 text-xs text-white hover:bg-white/10 flex items-center gap-2">
                      <Edit2 size={12} /> Sửa
                    </button>
                    <button onClick={() => { onDelete(comment.id); setOpenMenu(false); }} className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-white/10 flex items-center gap-2">
                      <Trash2 size={12} /> Xóa
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {isEditing ? (
            <div className="mt-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-studio-red resize-none"
                rows={2}
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-2">
                <button onClick={() => setIsEditing(false)} className="text-xs text-neutral-400 hover:text-white px-3 py-1">Hủy</button>
                <button onClick={async () => {
                  const success = await onUpdate(comment.id, editContent);
                  if (success) setIsEditing(false);
                }} className="text-xs bg-studio-red text-white px-3 py-1 rounded-full font-bold">Lưu</button>
              </div>
            </div>
          ) : (
            <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">{comment.content}</p>
          )}
        </div>
        
        {/* Actions */}
        {!isEditing && (
          <div className="flex items-center gap-4 mt-2 px-2">
            <button 
              onClick={() => onReact(comment.id, 'like')} 
              className={cn("flex items-center gap-1.5 text-[11px] font-medium transition-colors", comment.user_reaction === 'like' ? "text-studio-red" : "text-neutral-500 hover:text-white")}
            >
              <ThumbsUp size={14} className={comment.user_reaction === 'like' ? 'fill-current' : ''} /> {comment.likes_count > 0 ? comment.likes_count : null}
            </button>
            
            <button 
              onClick={() => onReact(comment.id, 'dislike')} 
              className={cn("flex items-center gap-1.5 text-[11px] font-medium transition-colors", comment.user_reaction === 'dislike' ? "text-blue-500" : "text-neutral-500 hover:text-white")}
            >
              <ThumbsDown size={14} className={comment.user_reaction === 'dislike' ? 'fill-current' : ''} />
            </button>
            
            {!isReply && (
              <button 
                onClick={() => { 
                  if (!user) {
                    setAuthModalOpen(true);
                    return;
                  }
                  setIsReplying(!isReplying); 
                  setReplyContent(''); 
                }} 
                className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-500 hover:text-white transition-colors"
              >
                <MessageSquare size={14} /> Trả lời
              </button>
            )}
          </div>
        )}

        {/* Reply Input */}
        {isReplying && !isReply && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 flex gap-3">
             <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 shrink-0">
              {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <UserIcon size={16} className="text-white/50 m-2" />}
            </div>
            <div className="flex-1 flex flex-col items-end gap-2">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Viết phản hồi..."
                autoFocus
                className="w-full bg-transparent border-b border-white/20 pb-2 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-studio-red"
              />
              <div className="flex gap-2">
                <button onClick={() => setIsReplying(false)} className="text-xs text-neutral-400 hover:text-white px-3 py-1">Hủy</button>
                <button onClick={async () => {
                  setSubmitting(true);
                  const success = await onReply(replyContent, comment.id);
                  if (success) {
                    setIsReplying(false);
                    setReplyContent('');
                  }
                  setSubmitting(false);
                }} disabled={submitting || !replyContent.trim()} className="text-[10px] bg-studio-red text-white px-3 py-1 rounded-full font-bold uppercase tracking-widest disabled:opacity-50">Trả lời</button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Render Replies */}
        {!isReply && (
          <div className="mt-2">
            {getReplies(comment.id).map((reply: any) => (
              <CommentItem 
                key={reply.id} 
                comment={reply} 
                isReply={true} 
                user={user}
                setAuthModalOpen={setAuthModalOpen}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onReact={onReact}
                onReply={onReply}
                getReplies={getReplies}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default function Comments({ projectId }: { projectId: string }) {
  const { user, setAuthModalOpen } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [projectId, user?.id]);

  const fetchComments = async () => {
    try {
      // Mock empty comments initially
      setComments([]);
    } catch (error) {
      console.error('Failed to fetch comments', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComment = async (content: string, parentId: number | null = null) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    if (!content.trim()) return;
    setSubmitting(true);

    try {
      // Mock creating comment locally
      const newCommentObj: Comment = {
        id: Date.now(),
        content,
        created_at: new Date().toISOString(),
        parent_id: parentId,
        is_edited: false,
        user_id: user.id,
        user_name: user.name || 'User',
        user_avatar: user.avatar || null,
        likes_count: 0,
        dislikes_count: 0,
        user_reaction: null
      };
      
      setComments(prev => [...prev, newCommentObj]);
      if (!parentId) {
        setNewComment('');
      }
      return true; // Return success status
    } catch (error) {
      console.error('Failed to post comment', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateComment = async (id: number, content: string) => {
    if (!content.trim()) return;
    try {
      setComments(prev => prev.map(c => c.id === id ? { ...c, content, is_edited: true } : c));
      return true; // Return success status
    } catch (error) {
      console.error('Failed to update comment', error);
    }
  };

  const handleDeleteComment = async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) return;
    try {
      // Remove comment and its children
      setComments(prev => prev.filter(c => c.id !== id && c.parent_id !== id));
    } catch (error) {
      console.error('Failed to delete comment', error);
    }
  };

  const handleReact = async (id: number, type: 'like' | 'dislike') => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    const comment = comments.find(c => c.id === id);
    if (!comment) return;

    // Optimistic update
    const isRemoving = comment.user_reaction === type;
    const newReaction = isRemoving ? null : type;
    
    setComments(prev => prev.map(c => {
      if (c.id !== id) return c;
      let likes = c.likes_count;
      let dislikes = c.dislikes_count;
      
      if (c.user_reaction === 'like') likes--;
      if (c.user_reaction === 'dislike') dislikes--;
      
      if (newReaction === 'like') likes++;
      if (newReaction === 'dislike') dislikes++;

      return { ...c, user_reaction: newReaction, likes_count: likes, dislikes_count: dislikes };
    }));
  };

  const parentComments = comments.filter(c => !c.parent_id).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const getReplies = (parentId: number) => comments.filter(c => c.parent_id === parentId).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  return (
    <div className="mt-12 bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-black text-white mb-6">
        Bình luận {comments.length > 0 ? `(${comments.length})` : ''}
      </h3>

      {/* Main Input Area */}
      <div className="flex gap-4 mb-10">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 shrink-0 flex items-center justify-center">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <UserIcon size={20} className="text-white/50" />
          )}
        </div>
        
        {user ? (
          <form onSubmit={(e) => { e.preventDefault(); handleCreateComment(newComment); }} className="flex-1 flex flex-col items-end gap-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Thêm bình luận..."
              className="w-full bg-transparent border-b border-white/20 pb-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-studio-red transition-colors"
            />
            {newComment.trim() && (
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-studio-red text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-colors flex items-center gap-2"
              >
                <Send size={14} />
                {submitting ? 'Đang gửi...' : 'Bình luận'}
              </button>
            )}
          </form>
        ) : (
          <div className="flex-1 flex items-center">
            <button 
              onClick={() => setAuthModalOpen(true)}
              className="w-full py-3 bg-white/5 border border-white/10 text-white/50 text-sm font-medium rounded-xl hover:bg-white/10 hover:text-white transition-colors text-left px-4"
            >
              Bạn cần đăng nhập để tham gia bình luận...
            </button>
          </div>
        )}
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="text-center text-white/50 py-10">Đang tải bình luận...</div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {parentComments.map((comment, i) => (
              <motion.div 
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
              >
                <CommentItem 
                  comment={comment} 
                  user={user}
                  setAuthModalOpen={setAuthModalOpen}
                  onUpdate={handleUpdateComment}
                  onDelete={handleDeleteComment}
                  onReact={handleReact}
                  onReply={handleCreateComment}
                  getReplies={getReplies}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          {parentComments.length === 0 && (
            <div className="text-center text-white/30 py-10 text-sm">
              Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
