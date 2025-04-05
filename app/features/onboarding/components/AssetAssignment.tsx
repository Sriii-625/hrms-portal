'use client';

import { useState } from 'react';
import styles from './AssetAssignment.module.css';

interface Asset {
  id: number;
  type: string;
  name: string;
  condition: 'New' | 'Good' | 'Fair';
  status: 'Available' | 'Assigned' | 'Maintenance';
  assignmentDate?: string;
  description: string;
  serialNumber: string;
}

export default function AssetAssignment() {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: 1,
      type: 'Laptop',
      name: 'MacBook Pro M1',
      condition: 'New',
      status: 'Available',
      description: 'High-performance laptop for development work',
      serialNumber: 'MBP2024-001'
    },
    {
      id: 2,
      type: 'Monitor',
      name: 'Dell UltraSharp 27"',
      condition: 'Good',
      status: 'Available',
      description: '4K USB-C Monitor',
      serialNumber: 'DEL2024-002'
    },
    {
      id: 3,
      type: 'Phone',
      name: 'iPhone 13',
      condition: 'New',
      status: 'Available',
      description: 'Company mobile device',
      serialNumber: 'IPH2024-003'
    },
    {
      id: 4,
      type: 'Accessories',
      name: 'Logitech MX Master 3',
      condition: 'New',
      status: 'Available',
      description: 'Wireless Mouse',
      serialNumber: 'LOG2024-004'
    }
  ]);

  const handleAssignAsset = (assetId: number) => {
    setAssets(assets.map(asset => {
      if (asset.id === assetId) {
        return {
          ...asset,
          status: 'Assigned',
          assignmentDate: new Date().toISOString().split('T')[0]
        };
      }
      return asset;
    }));
  };

  const handleReturnAsset = (assetId: number) => {
    setAssets(assets.map(asset => {
      if (asset.id === assetId) {
        return {
          ...asset,
          status: 'Available',
          assignmentDate: undefined
        };
      }
      return asset;
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Asset Assignment</h2>
        <p>Manage and track company assets assigned to you</p>
      </div>

      <div className={styles.assetGrid}>
        {assets.map((asset) => (
          <div key={asset.id} className={styles.assetCard}>
            <div className={styles.assetHeader}>
              <span className={styles.assetType}>{asset.type}</span>
              <span className={`${styles.status} ${styles[asset.status.toLowerCase()]}`}>
                {asset.status}
              </span>
            </div>

            <h3 className={styles.assetName}>{asset.name}</h3>
            <p className={styles.description}>{asset.description}</p>

            <div className={styles.assetDetails}>
              <div className={styles.detail}>
                <span className={styles.label}>Condition:</span>
                <span className={`${styles.condition} ${styles[asset.condition.toLowerCase()]}`}>
                  {asset.condition}
                </span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Serial Number:</span>
                <span>{asset.serialNumber}</span>
              </div>
              {asset.assignmentDate && (
                <div className={styles.detail}>
                  <span className={styles.label}>Assigned Date:</span>
                  <span>{asset.assignmentDate}</span>
                </div>
              )}
            </div>

            <div className={styles.actions}>
              {asset.status === 'Available' ? (
                <button
                  onClick={() => handleAssignAsset(asset.id)}
                  className={styles.assignButton}
                >
                  Assign Asset
                </button>
              ) : asset.status === 'Assigned' ? (
                <button
                  onClick={() => handleReturnAsset(asset.id)}
                  className={styles.returnButton}
                >
                  Return Asset
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}