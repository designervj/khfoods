import React from 'react';

import { useAuth } from '@payloadcms/ui';
import { LogOut } from 'lucide-react';

const CustomHeader = () => {
  const { user } = useAuth();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '60px',
        padding: '0 20px',
        borderBottom: '1px solid #e5e5e5',
        background: '#fff',
      }}
    >
      {/* Left Side Logo / Name */}
      <div style={{ fontSize: 18, fontWeight: 600 }}>
        My Admin Dashboard
      </div>

      {/* Right Side User Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: 14, opacity: 0.7 }}>
          {user?.email}
        </span>

        <button
        //   onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: 'none',
            padding: '6px 10px',
            background: '#f5f5f5',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default CustomHeader;
