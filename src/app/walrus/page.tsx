'use client'
import React, { useState } from 'react';

const Walrus: React.FC = () => {
  const [blobId, setBlobId] = useState('');
  const [blobContent, setBlobContent] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleStoreBlob = async () => {
    try {
      let body: string | Blob = blobContent;
      let contentType = 'text/plain';

      if (file) {
        body = file;
        contentType = file.type;
      }

      const response = await fetch(`https://publisher.walrus-testnet.walrus.space/v1/store`, {
        method: 'PUT',
        headers: {
          'Content-Type': contentType,
        },
        body,
      });
      const result = await response.json();
      setResponse(result);

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setUploadedImageUrl(imageUrl);
      }
    } catch (error) {
      if (error instanceof Error) {
        setResponse({ error: error.message });
      } else {
        setResponse({ error: 'An unknown error occurred' });
      }
    }
  };

  const handleReadBlob = async () => {
    try {
      const response = await fetch(`https://aggregator.walrus-testnet.walrus.space/v1/${blobId}`);
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.startsWith('image/')) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setResponse({ imageUrl });
      } else {
        const result = await response.json();
        setResponse(result);
      }
    } catch (error) {
      if (error instanceof Error) {
        setResponse({ error: error.message });
      } else {
        setResponse({ error: 'An unknown error occurred' });
      }
    }
  };

  return (
    <div>
      <h1>Walrus Client</h1>
      <div>
        <h2>Store Blob</h2>
        <textarea
          value={blobContent}
          onChange={(e) => setBlobContent(e.target.value)}
          placeholder="Enter blob content"
          className='text-black'
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className='text-black'
        />
        <button onClick={handleStoreBlob}>Store Blob</button>
      </div>
      <div>
        <h2>Read Blob</h2>
        <input
          type="text"
          value={blobId}
          onChange={(e) => setBlobId(e.target.value)}
          placeholder="Enter blob ID"
          className='text-black'
        />
        <button onClick={handleReadBlob}>Read Blob</button>
      </div>
      <div>
        <h2>Response</h2>
        {uploadedImageUrl && (
          <div>
            <h3>Uploaded Image:</h3>
            <img src={uploadedImageUrl} alt="Uploaded Blob" />
          </div>
        )}
        {response && response.imageUrl ? (
          <img src={response.imageUrl} alt="Blob Image" />
        ) : (
          <pre>{JSON.stringify(response, null, 2)}</pre>
        )}
      </div>
    </div>
  );
};

export default Walrus;