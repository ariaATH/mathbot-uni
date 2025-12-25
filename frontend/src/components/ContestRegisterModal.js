import React, { useState } from "react";
import { useWallet } from "../contexts/WalletContext.js";
import "../assets/scss/_modal.scss";

function ContestRegisterModal({ onClose }) {
  const { wallet, connectWallet } = useWallet();

  const [teamName, setTeamName] = useState("");
  const [status, setStatus] = useState("idle");
  const [code, setCode] = useState("");

  const handlePay = async () => {
    if (!teamName.trim()) {
      alert("Please enter team name");
      return;
    }

    if (!wallet) {
      connectWallet();
      return;
    }

    try {
      setStatus("processing");

      // fake payment (front-only)
      await new Promise((r) => setTimeout(r, 1500));

      const regCode =
        "REG-" + Math.random().toString(36).substring(2, 8).toUpperCase();

      setCode(regCode);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="contest-modal" onClick={(e) => e.stopPropagation()}>

        {/* INPUT */}
        {status === "idle" && (
          <>
            <h2>Contest Registration</h2>

            <input
              type="text"
              placeholder="Team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />

            <button className="wallet-btn" onClick={handlePay}>
              {!wallet ? "Connect Wallet" : "Pay & Register"}
            </button>
          </>
        )}

        {/* PROCESSING */}
        {status === "processing" && (
          <p className="status-text">Processing payment...</p>
        )}

        {/* SUCCESS */}
        {status === "success" && (
  <div className="success-box">
    <p>
      <span className="success-icon">✔</span> Registration successful
    </p>
    <div
      className="code-box"
      onClick={() => navigator.clipboard.writeText(code)}
    >
      {code}
    </div>
    <small>Click to copy your transaction ID</small>
  </div>
)}

        {/* ERROR */}
        {status === "error" && (
          <p className="status-text">Payment failed</p>
        )}

      </div>
    </div>
  );
}

export default ContestRegisterModal;
