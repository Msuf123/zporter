'use client';
import React from 'react';

export const  ScreeningCard = ({ data,tabIndex }) => {
  return (
    <div tabIndex={tabIndex}
    onClick={()=>{
        if(data.idDoc){

        
        window.location.href = 'edit/'+data.idDoc;
        }
        else{
            console.log(data)
        }
    }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px', // max-width for the card to look good on all screens
        margin: '10px',
      }}
    >
      {/* Static Heading */}
      <div style={{ gridColumn: 'span 2', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>
        Screening done on..
      </div>

      {/* Date/Time Display */}
      <div
        style={{
          gridColumn: 'span 2',
          textAlign: 'center',
          fontSize: '18px',
          color: '#333',
        }}
      >
        Date: {data.formattedDateTime}
      </div>
    </div>
  );
};
