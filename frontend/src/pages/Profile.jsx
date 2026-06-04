import { useState } from 'react';
import { 
  Upload, 
  Calendar, 
  Activity, 
  FileText, 
  Mail,
  TrendingUp,
  Edit,
  Camera,
  Save,
  User,
  Lock,
  Bell,
  Shield,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle
} from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [showEditPage, setShowEditPage] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'user123',
    email: 'user123@email.com',
    bio: 'Health enthusiast focused on wellness and preventive care',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true
  });

  const stats = [
    { 
      label: 'Total Reports', 
      value: '24', 
      icon: FileText,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50'
    },
    { 
      label: 'Appointments', 
      value: '12', 
      icon: Calendar,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50'
    },
    { 
      label: 'Active Days', 
      value: '156', 
      icon: Activity,
      iconColor: 'text-pink-600',
      iconBg: 'bg-pink-50'
    },
    { 
      label: 'Health Score', 
      value: '92%', 
      icon: TrendingUp,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-50'
    }
  ];

  const recentUploads = [
    { name: 'Blood Test Results.pdf', date: 'Jan 20, 2026', type: 'Lab Report', color: 'bg-blue-500' },
    { name: 'X-Ray Chest.jpg', date: 'Jan 18, 2026', type: 'Imaging', color: 'bg-purple-500' },
    { name: 'Prescription.pdf', date: 'Jan 15, 2026', type: 'Prescription', color: 'bg-pink-500' },
    { name: 'Health Checkup.pdf', date: 'Jan 10, 2026', type: 'Report', color: 'bg-orange-500' }
  ];

  const upcomingAppointments = [
    { doctor: 'Dr. Priya Sharma', specialty: 'Cardiologist', date: 'Jan 28, 2026', time: '10:00 AM' },
    { doctor: 'Dr. Arjun Patel', specialty: 'General Physician', date: 'Feb 5, 2026', time: '2:30 PM' },
    { doctor: 'Dr. Ananya Reddy', specialty: 'Dermatologist', date: 'Feb 12, 2026', time: '11:00 AM' }
  ];

  const settingsSections = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'security', label: 'Security & Password', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy Settings', icon: Shield }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveProfile = () => {
    alert('Profile saved successfully!');
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    setShowConfirmationModal(true);
  };

  const handleExportData = () => {
    setShowExportModal(false);
    alert('Your data export request has been received. You will receive an email with your data within 24 hours.');
  };

  if (showEditPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-5xl mx-auto p-6">
          <div className="mb-8">
            <button
              onClick={() => setShowEditPage(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Profile</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account preferences and settings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span className="text-sm">{section.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                {activeSection === 'profile' && (
                  <div key="profile-section-v2">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Profile Picture
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
                          {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-10 h-10 text-white" />
                          )}
                        </div>
                        <input
                          type="file"
                          id="profile-upload-settings"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="profile-upload-settings"
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium cursor-pointer transition-colors text-sm"
                        >
                          Change Photo
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleSaveProfile}
                      className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                )}

                {activeSection === 'security' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Security & Password</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            placeholder="Enter current password"
                            className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5 text-gray-400" />
                            ) : (
                              <Eye className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          placeholder="Enter new password"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm new password"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleSaveProfile}
                      className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Update Password
                    </button>

                    <button
                      onClick={() => alert('Password reset link has been sent to your email')}
                      className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {activeSection === 'notifications' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-600">Receive updates via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="emailNotifications"
                            checked={formData.emailNotifications}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${formData.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'}`}>
                            <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out ${formData.emailNotifications ? 'translate-x-5' : 'translate-x-0'}`}></div>
                          </div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">Push Notifications</h3>
                          <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="pushNotifications"
                            checked={formData.pushNotifications}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${formData.pushNotifications ? 'bg-blue-600' : 'bg-gray-300'}`}>
                            <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out ${formData.pushNotifications ? 'translate-x-5' : 'translate-x-0'}`}></div>
                          </div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">Weekly Health Reports</h3>
                          <p className="text-sm text-gray-600">Get weekly summaries of your health data</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="weeklyReports"
                            checked={formData.weeklyReports}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${formData.weeklyReports ? 'bg-blue-600' : 'bg-gray-300'}`}>
                            <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out ${formData.weeklyReports ? 'translate-x-5' : 'translate-x-0'}`}></div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={handleSaveProfile}
                      className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Preferences
                    </button>
                  </div>
                )}

                {activeSection === 'privacy' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Privacy Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                        <h3 className="font-bold text-red-900 mb-2">Delete Account</h3>
                        <p className="text-sm text-red-700 mb-4">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button 
                          onClick={() => setShowDeleteModal(true)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm"
                        >
                          Delete My Account
                        </button>
                      </div>

                      <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-bold text-blue-900 mb-2">Download Your Data</h3>
                        <p className="text-sm text-blue-700 mb-4">
                          Request a copy of all your health data and documents.
                        </p>
                        <button 
                          onClick={() => setShowExportModal(true)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
                        >
                          Request Data Export
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Account">
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800 font-medium mb-2">⚠️ Warning: This action is irreversible!</p>
              <p className="text-sm text-red-700">
                Do you really want to delete your account? All your data will be permanently removed and cannot be recovered.
              </p>
            </div>
            <p className="text-sm text-gray-600">
              A confirmation email will be sent to <strong>{formData.email}</strong> to complete this process.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Yes, Delete My Account
              </button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={showExportModal} onClose={() => setShowExportModal(false)} title="Request Data Export">
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 font-medium mb-2">📦 Data Export Request</p>
              <p className="text-sm text-blue-700">
                We'll prepare a complete archive of all your health data, documents, and information.
              </p>
            </div>
            <p className="text-sm text-gray-600">
              You will receive an email at <strong>{formData.email}</strong> with a download link within 24 hours.
            </p>
            <p className="text-xs text-gray-500">
              The export will include: Medical records, uploaded documents, appointments history, and account information.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleExportData}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Request Export
              </button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={showConfirmationModal} onClose={() => setShowConfirmationModal(false)} title="Confirmation Email Sent">
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="flex justify-center mb-3">
                <CheckCircle className="w-16 h-16 text-blue-600" />
              </div>
              <p className="text-sm text-green-800 font-medium mb-2">Email Sent Successfully!</p>
              <p className="text-sm text-green-700">
                A confirmation email has been sent to <strong>{formData.email}</strong>
              </p>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Please check your inbox and follow the instructions to complete the account deletion process.
            </p>
            <button
              onClick={() => setShowConfirmationModal(false)}
              className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Got It
            </button>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <Camera className="w-4 h-4 text-white" />
              </label>
            </div>

            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">{formData.fullName}</h1>
                  <p className="text-sm text-gray-500 mb-3">Member since January 2026</p>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{formData.email}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowEditPage(true)}
                  className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center gap-2 text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Uploads</h2>
              <button className="text-sm text-blue-600 font-semibold hover:text-blue-700">
                View All
              </button>
            </div>
            <div className="space-y-3 mb-4">
              {recentUploads.map((upload, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className={`w-12 h-12 ${upload.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{upload.name}</h3>
                    <p className="text-xs text-gray-500">{upload.date}</p>
                  </div>
                  <span className="text-xs font-medium text-gray-600 bg-gray-200 px-3 py-1 rounded-full whitespace-nowrap">
                    {upload.type}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm">
              <Upload className="w-5 h-5" />
              Upload New Document
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Upcoming Appointments</h2>
            <div className="space-y-3 mb-4">
              {upcomingAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-200 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{appointment.doctor}</h3>
                  <p className="text-xs text-gray-600 mb-2">{appointment.specialty}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{appointment.date} • {appointment.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm">
              <Calendar className="w-5 h-5" />
              Schedule New
            </button>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Health Guidance, Made Simple</h2>
              <p className="text-gray-600">
                Upload your diagnosis. Track your health. Get AI-powered guidance you can trust.
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

