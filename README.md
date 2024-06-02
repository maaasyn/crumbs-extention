### Extention communication

```mermaid
sequenceDiagram
    Popup->>Content: GET_ACCOUNT
    Content->>Injected: GET_ACCOUNT
    Injected->>Wallet: GET_ACCOUNT
    Wallet-->>Injected: SEND_ACCOUNT
    Injected-->>Content: SEND_ACCOUNT
    Content -->>  Popup: SEND_ACCOUNT
```
