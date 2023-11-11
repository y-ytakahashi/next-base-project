import { initializeApp, getApps, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

/**
 * @description Firebaseの管理画面から取得した管理者アカウント情報
 * @note 環境変数は`.env.local`ファイルに定義しています
 */
const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY || "").replace(/\\n/g, "\n")
};

/**
 * @description Firebase Admin SDKを扱うためのオブジェクト
 * @note バックエンドのみで使用可能
 */
export const firebaseAdmin =
  getApps()[0] ||
  initializeApp({
    credential: cert(serviceAccount)
  });

export const fbAdminAuth = getAuth();
