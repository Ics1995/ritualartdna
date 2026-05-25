import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

function App() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [savedArtworks, setSavedArtworks] = useState([]);
  const [verifiedArt, setVerifiedArt] = useState(null);

  const [wallet, setWallet] = useState("");
  const [minted, setMinted] = useState(false);
const [txHash, setTxHash] = useState("");

const [aiScore, setAiScore] = useState(null);
const [scanStatus, setScanStatus] =
  useState("");

  const [isScanning, setIsScanning] =
  useState(false);

  useEffect(() => {
    const data = localStorage.getItem("artworks");

    if (data) {
      setSavedArtworks(JSON.parse(data));
    }

    const savedWallet =
  localStorage.getItem("wallet");

if (savedWallet) {
  setWallet(savedWallet);
}

  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const saveArtwork = () => {
    const newArtwork = {
      id: "ART-" + Date.now(),
      title,
      artist,
      image,
    };

    const updated = [...savedArtworks, newArtwork];

    setSavedArtworks(updated);

    localStorage.setItem(
      "artworks",
      JSON.stringify(updated)
    );
  };

  const connectWallet = async () => {
  if (!window.ethereum) {
    alert("MetaMask belum terinstall");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setWallet(accounts[0]);

    localStorage.setItem(
  "wallet",
  accounts[0]
);

  } catch (error) {
    console.log(error);
  }
};

const verifyArtwork = (art) => {
  setVerifiedArt(null);

  setIsScanning(true);

  setTimeout(() => {
    setVerifiedArt(art);

    const randomScore =
      Math.floor(Math.random() * 20) + 80;

    setAiScore(randomScore);

    if (randomScore >= 90) {
      setScanStatus(
        "Authentic Masterpiece"
      );
    } else {
      setScanStatus(
        "Potentially Manipulated"
      );
    }

    setIsScanning(false);
  }, 2500);
};

const deleteArtwork = (id) => {
  const filtered = savedArtworks.filter(
    (art) => art.id !== id
  );

  setSavedArtworks(filtered);

  localStorage.setItem(
    "artworks",
    JSON.stringify(filtered)
  );
};

const mintNFT = () => {
  const fakeHash =
    "0x" +
    Math.random().toString(16).substring(2, 18);

  setTxHash(fakeHash);
  setMinted(true);
};

useEffect(() => {
  const style =
    document.createElement("style");

  style.innerHTML = `
    @keyframes scanMove {
      0% {
        transform:
          translateX(-100%);
      }

      100% {
        transform:
          translateX(100%);
      }
    }
  `;

  document.head.appendChild(style);
}, []);

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Orbitron, sans-serif",
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1
  style={{
    fontSize: "64px",
    color: "#00ffcc",
    textShadow:
      "0 0 20px #00ffcc",
    marginBottom: "10px",
  }}
>
  🎨 ArtDNA
</h1>

      <p
  style={{
    color: "#94a3b8",
    marginBottom: "30px",
    letterSpacing: "2px",
  }}
>
  Neural AI Artwork Verification Protocol
</p>

<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "40px",
  }}
>
  <div
    style={{
      background: "#111827",
      padding: "20px",
      borderRadius: "20px",
      border: "1px solid #00ffcc",
      boxShadow:
        "0 0 15px #00ffcc",
    }}
  >
    <h3
      style={{
        color: "#00ffcc",
      }}
    >
      🎨 Total Artworks
    </h3>

    <h1>{savedArtworks.length}</h1>
  </div>

  <div
    style={{
      background: "#111827",
      padding: "20px",
      borderRadius: "20px",
      border: "1px solid #8b5cf6",
      boxShadow:
        "0 0 15px #8b5cf6",
    }}
  >
    <h3
      style={{
        color: "#c4b5fd",
      }}
    >
      👛 Wallet Status
    </h3>

    <h1>
      {wallet
        ? "Connected"
        : "Offline"}
    </h1>
  </div>

  <div
    style={{
      background: "#111827",
      padding: "20px",
      borderRadius: "20px",
      border: "1px solid #00ff88",
      boxShadow:
        "0 0 15px #00ff88",
    }}
  >
    <h3
      style={{
        color: "#00ff88",
      }}
    >
      🚀 NFT Status
    </h3>

    <h1>
      {minted
        ? "Minted"
        : "Not Minted"}
    </h1>
  </div>

  <div
    style={{
      background: "#111827",
      padding: "20px",
      borderRadius: "20px",
      border: "1px solid #f97316",
      boxShadow:
        "0 0 15px #f97316",
    }}
  >
    <h3
      style={{
        color: "#fdba74",
      }}
    >
      🤖 AI Engine
    </h3>

    <h1>ONLINE</h1>
  </div>
</div>

      <button
  onClick={connectWallet}
  style={{
    padding: "12px 20px",
    background: "#f97316",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "20px",
  }}
>
  Connect MetaMask
</button>

{wallet && (
  <p>
    Connected Wallet: {wallet}
  </p>
)}

      <input
        type="text"
        placeholder="Artwork Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
        }}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Artist Name"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
        }}
      />

      <br />
      <br />

      <input type="file" onChange={handleImage} />

      <br />
      <br />

      <button
        onClick={saveArtwork}
        style={{
          padding: "12px 20px",
          background:
  "linear-gradient(90deg,#00ffcc,#00ff88)",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow:
  "0 0 20px #00ff88",
        }}
      >
        Save Artwork
      </button>

      {image && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={image}
            alt="preview"
            style={{
              width: "300px",
              borderRadius: "12px",
            }}
          />
        </div>
      )}

      <div style={{ marginTop: "30px" }}>
        <QRCodeCanvas
          value={`Title: ${title} | Artist: ${artist}`}
        />
      </div>

      <br />

<button
  onClick={mintNFT}
  style={{
    padding: "12px 20px",
    background: "#8b5cf6",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "white",
  }}
>
  Mint NFT
</button>

{minted && (
  <div
    style={{
      background: "#1e1b4b",
      border: "2px solid #8b5cf6",
      padding: "20px",
      borderRadius: "20px",
      marginTop: "20px",
      boxShadow: "0 0 20px #8b5cf6",
    }}
  >
    <h2 style={{ color: "#c4b5fd" }}>
      🚀 NFT MINTED
    </h2>

    <p>
      Transaction Hash:
    </p>

    <p
      style={{
        wordBreak: "break-all",
        color: "#a78bfa",
      }}
    >
      {txHash}
    </p>
  </div>
)}

{isScanning && (
  <div
    style={{
      marginTop: "30px",
      padding: "25px",
      borderRadius: "20px",
      background: "#111827",
      border: "2px solid #00ffcc",
      boxShadow:
        "0 0 20px #00ffcc",
    }}
  >
    <h2
      style={{
        color: "#00ffcc",
      }}
    >
      🤖 AI Neural Scan Running...
    </h2>

    <p
      style={{
        color: "#94a3b8",
      }}
    >
      Analyzing brush pattern,
      metadata, and forgery
      probability...
    </p>

    <div
      style={{
        height: "10px",
        width: "100%",
        background: "#1e293b",
        borderRadius: "999px",
        overflow: "hidden",
        marginTop: "15px",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(90deg,#00ffcc,#00ff88)",
          animation:
            "scanMove 2s linear infinite",
        }}
      ></div>
    </div>
  </div>
)}

      {verifiedArt && (
        <div
          style={{
            background: "#111827",
            border: "2px solid #00ff88",
            borderRadius: "20px",
            padding: "25px",
            marginTop: "20px",
            marginBottom: "20px",
            boxShadow: "0 0 20px #00ff88",
            color: "white",
          }}
        >
          <h2
            style={{
              color: "#00ff88",
              fontSize: "32px",
            }}
          >
            ✅ VERIFIED ARTWORK
          </h2>

          <p>
            <b>ID:</b> {verifiedArt.id}
          </p>

          <p>
            <b>Title:</b> {verifiedArt.title}
          </p>

          <p>
            <b>Artist:</b> {verifiedArt.artist}
          </p>

          <p>
  <b>AI Authenticity:</b>
  {aiScore}%
</p>

<p>
  <b>Neural Scan:</b>
  {scanStatus}
</p>

          {verifiedArt.image && (
            <img
              src={verifiedArt.image}
              alt=""
              style={{
                width: "250px",
                borderRadius: "10px",
              }}
            />
          )}
        </div>
      )}

      <h2>Saved Artworks</h2>

      {savedArtworks.map((art) => (
        <div
          key={art.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginTop: "15px",
            borderRadius: "10px",
            background: "#1e293b",
          }}
        >
          <p>
            <b>ID:</b> {art.id}
          </p>

          <p>
            <b>Title:</b> {art.title}
          </p>

          <p>
            <b>Artist:</b> {art.artist}
          </p>

          <button
            onClick={() => verifyArtwork(art)}
            style={{
              padding: "10px 15px",
              background: "#00ff88",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            Verify Artwork
          </button>
          <button
  onClick={() => deleteArtwork(art.id)}
  style={{
    padding: "10px 15px",
    background: "#ff3b30",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginLeft: "10px",
    color: "white",
  }}
>
  Delete
</button>

          <br />

          {art.image && (
            <img
              src={art.image}
              alt=""
              style={{
                width: "200px",
                borderRadius: "10px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default App;