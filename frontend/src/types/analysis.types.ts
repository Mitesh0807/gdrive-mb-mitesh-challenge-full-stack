export interface Owner {
  displayName: string;
  kind: string;
  me: boolean;
  permissionId: string;
  emailAddress: string;
  photoLink: string;
}

export interface Permission {
  id: string;
  displayName: string;
  type: string;
  kind: string;
  photoLink: string;
  emailAddress: string;
  role: string;
  deleted: boolean;
  pendingOwner: boolean;
}

export interface File {
  owners: Owner[];
  webViewLink: string;
  webContentLink?: string;
  permissions?: Permission[];
  id: string;
  name: string;
  modifiedTime: string;
}

export interface FileAnalytics {
  name: string;
  webViewLink: string;
  riskScore: number;
  permissionCount?: number;
  isPubliclyAccessible?: boolean;
  matchesSecretPattern: boolean;
}

export interface ResponseOfAnalysis {
  totalRiskScore: number;
  overallRiskPercentage: number;
  highRiskCount: number;
  moderateRiskCount: number;
  lowRiskCount: number;
  fileAnalytics: FileAnalytics[];
  files: File[];
  totalFiles: number;
  externalShareCount: number;
  externalFiles: File[];
}

export interface FileData {
  owners: {
    displayName: string;
    emailAddress: string;
  }[];
  webViewLink?: string;
  webContentLink?: string;
  id: string;
  name: string;
  modifiedTime: string;
  isPubliclyAccessible: boolean;
}
