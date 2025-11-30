// UserProfilePage.tsx
import { useTranslation } from "react-i18next";
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";

export default function UserProfilePage() {
  const { t } = useTranslation("common");

  return (
    <div className="min-h-screen bg-white">
      <div className="relative">
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 pb-12">
            <ProfileInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
