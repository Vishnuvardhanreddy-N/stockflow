import { useState } from 'react';
import { IconX, IconTrash } from '../Icons';

interface Props {
  title: string;
  message: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export default function ConfirmModal({ title, message, onConfirm, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 380 }}>
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="modal-close" onClick={onClose}><IconX /></button>
        </div>
        <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.6 }}>{message}</p>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-danger-ghost" onClick={handleConfirm} disabled={loading}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <IconTrash />
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
