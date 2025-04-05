'use client';

import { useState } from 'react';
import styles from './AssetRecovery.module.css';

interface Asset {
  id: number;
  name: string;
  type: string;
  assignedDate: string;
  condition: string;
  status: 'pending' | 'returned' | 'damaged' | 'lost';
  notes: string;
}

export default function AssetRecovery() {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: 1,
      name: 'MacBook Pro',
      type: 'Laptop',
      assignedDate: '2023-01-15',
      condition: 'Good',
      status: 'pending',
      notes: ''
    },
    {
      id: 2,
      name: 'iPhone 13',
      type: 'Mobile Device',
      assignedDate: '2023-01-15',
      condition: 'Fair',
      status: 'pending',
      notes: ''
    },
    {
      id: 3,
      name: 'Access Card',
      type: 'Security',
      assignedDate: '2023-01-15',
      condition: 'Good',
      status: 'pending',
      notes: ''
    }
  ]);

  const [newAssetNote, setNewAssetNote] = useState('');
  const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null);

  const updateAssetStatus = (id: number, newStatus: Asset['status']) => {
    setAssets(assets.map(asset =>
      asset.id === id ? { ...asset, status: newStatus } : asset
    ));
  };

  const addNoteToAsset = (id: number) => {
    if (!newAssetNote.trim()) return;

    setAssets(assets.map(asset =>
      asset.id === id ? { ...asset, notes: asset.notes ? `${asset.notes}\n${newAssetNote}` : newAssetNote } : asset
    ));
    setNewAssetNote('');
    setSelectedAssetId(null);
  };

  const getStatusColor = (status: Asset['status']) => {
    switch (status) {
      case 'returned': return styles.returned;
      case 'damaged': return styles.damaged;
      case 'lost': return styles.lost;
      default: return styles.pending;
    }
  };

  return (
    <div className={styles.container}>
      <h2>Asset Recovery Management</h2>
      
      <div className={styles.assetList}>
        {assets.map((asset) => (
          <div key={asset.id} className={styles.assetCard}>
            <div className={styles.assetHeader}>
              <h3>{asset.name}</h3>
              <span className={`${styles.status} ${getStatusColor(asset.status)}`}>
                {asset.status}
              </span>
            </div>

            <div className={styles.assetDetails}>
              <p>Type: {asset.type}</p>
              <p>Assigned Date: {asset.assignedDate}</p>
              <p>Condition: {asset.condition}</p>
            </div>

            <div className={styles.assetActions}>
              <div className={styles.statusButtons}>
                <button
                  onClick={() => updateAssetStatus(asset.id, 'returned')}
                  className={`${styles.actionButton} ${asset.status === 'returned' ? styles.active : ''}`}
                >
                  Returned
                </button>
                <button
                  onClick={() => updateAssetStatus(asset.id, 'damaged')}
                  className={`${styles.actionButton} ${asset.status === 'damaged' ? styles.active : ''}`}
                >
                  Damaged
                </button>
                <button
                  onClick={() => updateAssetStatus(asset.id, 'lost')}
                  className={`${styles.actionButton} ${asset.status === 'lost' ? styles.active : ''}`}
                >
                  Lost
                </button>
              </div>

              {asset.notes && (
                <div className={styles.notes}>
                  <h4>Notes:</h4>
                  <p>{asset.notes}</p>
                </div>
              )}

              {selectedAssetId === asset.id ? (
                <div className={styles.addNote}>
                  <textarea
                    value={newAssetNote}
                    onChange={(e) => setNewAssetNote(e.target.value)}
                    placeholder="Add a note about this asset..."
                    className={styles.noteInput}
                  />
                  <div className={styles.noteActions}>
                    <button
                      onClick={() => addNoteToAsset(asset.id)}
                      className={styles.saveButton}
                    >
                      Save Note
                    </button>
                    <button
                      onClick={() => {
                        setSelectedAssetId(null);
                        setNewAssetNote('');
                      }}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedAssetId(asset.id)}
                  className={styles.addNoteButton}
                >
                  Add Note
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}