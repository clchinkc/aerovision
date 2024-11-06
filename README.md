# AeroVision

## 概覽

AeroVision 是一個網頁應用程式，旨在簡化航班廢棄物數據收集和分析的過程。該應用程式利用現代網頁技術和人工智慧驅動的洞察力，提供一個全面的解決方案來管理和分析廢棄物數據。此專案是作為 Cathay Hackathon 2024 的一部分開發的，專注於快速開發和創新解決方案。

## 功能

### 廢棄物數據收集

[![Waste Data Collection Flow](https://mermaid.ink/img/pako:eNp1VF1PGkEU_SubeWg0AQUWRTbRpNH0SZOmakwKPkx3R9l0Ych-pNWVRBsQKBhIih9Va6rWSluV2qaWtNb-GWaW_RcOrAJSOw-bO5tz7rmfYwIRSwgIYE7BL8QIVHVuaiwc49jRjGfzKoxHuEeKPB_RZ6CmozGow1GsKEjUZRzjQvXMZ6twSn4f0MOklf1E16v0zTYtXdg7q7OOl8ZpUXtCXdBa9TV59d1-v2K_O5jtvYfBDQ-PcNNxBUPpcQTr2HQYVurYyqYTXYRxWdND_ST10_5SagmR4ppVPieZzfp-mRaK1odf_R2hTWEdKjOokaBZv6yS1FGLaFX_2Om1Do221REQ96CtzbndI9zS-PhE_e26VVxd4iZ11RB1Q0VSI5dQj_WjSI9zJL9BN9J098SpgYvkUzR3QgoVsrPHakeXj0lmle4V65l0u1yVUu0qV7v8ap1t9t4ff1N9TNbiClx4gkSsSppp2vsVljHNLtPdbL28ZeeTCZZRm383wma177poQ-_-b6pNa0gdjWBZRKZVKtPMhb3CMursSxvRJDxU2JiNYlV1BkgLkdRKvXzukGt_z-jpoVOU2f-6mDSiUajKi4gN01meZorkKk_yFdatG2bHGHXLce6-RoccOVJYs49y3U1yyCgmOYbzbWk2C9S1D6EeWinQk_2bXbjKW9vJrjEnp1sk-e22b138m6AYgMFq1Y9O8_-NC7hAFKlRKEtsXc2GqzDQIyiKwkBgpgTV52EQjiUYDho6nlyIiUBgPpALqNiYjwBhDioauxlxCTJpGbL1jt5CkCTrWJ1wHoPmm-ACcRh7inELwq5AMMFLIPg83r7AgD_o9wUCg57AIO9zgQUguL3eYB8f9PKewBDv4QN-PuECi00PDD84EBzgeY-PH-L9Pl8wcQ3t0ewJ?type=png)](https://mermaid.live/edit#pako:eNp1VF1PGkEU_SubeWg0AQUWRTbRpNH0SZOmakwKPkx3R9l0Ych-pNWVRBsQKBhIih9Va6rWSluV2qaWtNb-GWaW_RcOrAJSOw-bO5tz7rmfYwIRSwgIYE7BL8QIVHVuaiwc49jRjGfzKoxHuEeKPB_RZ6CmozGow1GsKEjUZRzjQvXMZ6twSn4f0MOklf1E16v0zTYtXdg7q7OOl8ZpUXtCXdBa9TV59d1-v2K_O5jtvYfBDQ-PcNNxBUPpcQTr2HQYVurYyqYTXYRxWdND_ST10_5SagmR4ppVPieZzfp-mRaK1odf_R2hTWEdKjOokaBZv6yS1FGLaFX_2Om1Do221REQ96CtzbndI9zS-PhE_e26VVxd4iZ11RB1Q0VSI5dQj_WjSI9zJL9BN9J098SpgYvkUzR3QgoVsrPHakeXj0lmle4V65l0u1yVUu0qV7v8ap1t9t4ff1N9TNbiClx4gkSsSppp2vsVljHNLtPdbL28ZeeTCZZRm383wma177poQ-_-b6pNa0gdjWBZRKZVKtPMhb3CMursSxvRJDxU2JiNYlV1BkgLkdRKvXzukGt_z-jpoVOU2f-6mDSiUajKi4gN01meZorkKk_yFdatG2bHGHXLce6-RoccOVJYs49y3U1yyCgmOYbzbWk2C9S1D6EeWinQk_2bXbjKW9vJrjEnp1sk-e22b138m6AYgMFq1Y9O8_-NC7hAFKlRKEtsXc2GqzDQIyiKwkBgpgTV52EQjiUYDho6nlyIiUBgPpALqNiYjwBhDioauxlxCTJpGbL1jt5CkCTrWJ1wHoPmm-ACcRh7inELwq5AMMFLIPg83r7AgD_o9wUCg57AIO9zgQUguL3eYB8f9PKewBDv4QN-PuECi00PDD84EBzgeY-PH-L9Pl8wcQ3t0ewJ)

1. **照片上傳和分析**：
   - 使用者可以上傳廢棄物的照片，這些照片將使用大型語言模型（LLM）進行分析，以識別廢棄物類型並估算其數量。
   - 提供一個可選的輸入框，讓使用者輸入廢棄物的總重量，幫助 LLM 估算每種廢棄物類型的比例。

2. **結構化數據顯示**：
   - 分析後，結構化數據將以表格格式顯示，包括廢棄物類型、估算數量和可回收性。
   - 使用者可以進行手動修改廢棄物類型、估算數量和可回收性，以確保數據一致性。

3. **匯總摘要**：
   - 匯總表格整合估算和手動輸入，提供最終廢棄物類型和數量的概覽。

4. **數據管理選項**：
   - “清除所有”按鈕允許使用者重置所有條目和分析結果。
   - “提交到資料庫”按鈕將數據保存到共享資料庫中，以供未來參考和分析。

### 廢棄物數據分析（計劃中）

[![Waste Data Analysis Flow](https://mermaid.ink/img/pako:eNp9kl9r01AYxr9KOFcTstLmb5uLQVlBe-GVgmDjxVly1hxMk5KcqLX0thYctOI2cCsbnWNKoaxOpnMFP405zb6FJ8napeA8V-fwPr_3fV7O0waGayKggW3bfW1Y0CPc04rucOz4wVbdg02Lq0ACN13bRgbBrsPV6N4V_XhAd3_cHHZfpNr4PMI-cT1sQDsGamt08jPsX6TiB_fquPX1De4Z9AlKqag3nvcn4eyE7n9aZZFj_sNYBftNG7YWrsJve_PT68y0Zetk0Ga84S3CHKZIr0uPBuFwPxp9vRmdMzz89T3sT7Oes1zS6GFswK-tZeH_AuVq2YF2y8cMmu8e096gXL0PvtMmaNXxcd0iy2nzywE9Gka9d9HZ--jL5yyZ2kqo5Za3OyVTGJTtkUUXU7LwXXVllSQHcMtGZfMVNhDz1T-PRjvh7DqaTDWOXh2G0w90OP7zu0svx9HFbOULAQ8ayGtAbLLYteOCDoiFGkgHGrua0HupA93pMB0MiPuk5RhAI16AeOC5Qd0C2ja0ffYKmiZkf4shS0NjIUEmZul6nIY6yTYPmtB57rpLCXsCrQ3eAE0s5XNySZBVRZRkuSCpPGgBTVFzoiIogiCWikJJUQsdHrxN-HxOUUVJkovFvFQQ87Isdf4CV2JKew?type=png)](https://mermaid.live/edit#pako:eNp9kl9r01AYxr9KOFcTstLmb5uLQVlBe-GVgmDjxVly1hxMk5KcqLX0thYctOI2cCsbnWNKoaxOpnMFP405zb6FJ8napeA8V-fwPr_3fV7O0waGayKggW3bfW1Y0CPc04rucOz4wVbdg02Lq0ACN13bRgbBrsPV6N4V_XhAd3_cHHZfpNr4PMI-cT1sQDsGamt08jPsX6TiB_fquPX1De4Z9AlKqag3nvcn4eyE7n9aZZFj_sNYBftNG7YWrsJve_PT68y0Zetk0Ga84S3CHKZIr0uPBuFwPxp9vRmdMzz89T3sT7Oes1zS6GFswK-tZeH_AuVq2YF2y8cMmu8e096gXL0PvtMmaNXxcd0iy2nzywE9Gka9d9HZ--jL5yyZ2kqo5Za3OyVTGJTtkUUXU7LwXXVllSQHcMtGZfMVNhDz1T-PRjvh7DqaTDWOXh2G0w90OP7zu0svx9HFbOULAQ8ayGtAbLLYteOCDoiFGkgHGrua0HupA93pMB0MiPuk5RhAI16AeOC5Qd0C2ja0ffYKmiZkf4shS0NjIUEmZul6nIY6yTYPmtB57rpLCXsCrQ3eAE0s5XNySZBVRZRkuSCpPGgBTVFzoiIogiCWikJJUQsdHrxN-HxOUUVJkovFvFQQ87Isdf4CV2JKew)

- **數據收集模組**：
  - 與共享資料庫整合，存儲來自各航班的歷史廢棄物數據，允許趨勢追蹤和回收率測量。

- **數據顯示和分析模組**：
  - 提供數據圖表洞察的視覺平台，幫助了解廢棄物分佈和回收表現。
  - 利用生成式人工智慧，將圖表的影像作為輸入，提供可行的洞察和建議，以優化廢棄物管理。

*注意：廢棄物數據分析的網頁應用程式正在計劃中，但尚未實施。*

## 技術堆疊

- **後端**：使用 FastAPI 建立 API 端點，使用 SQLite 管理資料庫。
- **前端**：使用 React 建立使用者介面，使用 Tailwind CSS 進行樣式設計。
- **生成式人工智慧整合**：使用生成式人工智慧模型分析廢棄物數據並提供洞察。

## 入門指南

### 先決條件

- 前端開發需要 Node.js 和 npm。
- 後端開發需要 Python 和 pip。

### 安裝

1. **後端**：
   - 進入 `aerovision-backend` 目錄。
   - 安裝依賴項：`pip install -r requirements.txt`
   - 啟動伺服器：`uvicorn analyze_main:app --reload`

2. **前端**：
   - 進入 `aerovision-frontend` 目錄。
   - 安裝依賴項：`npm install`
   - 啟動開發伺服器：`npm run dev`

