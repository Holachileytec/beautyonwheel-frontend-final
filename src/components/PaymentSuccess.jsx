import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../config/api';
import "../Styles/paymentSuccess.css";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("verifying");
    const navigate = useNavigate();
    
    // 1. Get the reference from the URL
    const reference = searchParams.get('reference');

    useEffect(() => {
        if (reference) {
            verify();
        }
    }, [reference]);

    const verify = async () => {
        try {
            const res = await api.get(`http://167.71.150.48:8000/api/paystack/verify/${reference}`);
            if (res.data.success) {
                setStatus("success");
            } else {
                setStatus("failed");
            }
        } catch (err) {
            setStatus("failed")
            console.error("An error occurred during verification:", err);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }} className='successPg'>
            {status === "verifying" && <h2>Verifying your payment... Please wait.</h2>}
            
            {status === "success" && (
                <div>
                    <h2 style={{ color: 'green' }}>✔ Payment Successful!</h2>
                    <p>Your subscription is now active for 30 days.</p>
                    <button onClick={() => navigate('/user-dashboard')}>Go to Dashboard</button>
                </div>
            )}

            {status === "failed" && (
                <div>
                    <h2 style={{ color: 'red' }}>❌ Payment Verification Failed</h2>
                    <p>If you were debited, please contact support with reference: {reference}</p>
                    <button onClick={() => navigate('/pricing')}>Try Again</button>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;
