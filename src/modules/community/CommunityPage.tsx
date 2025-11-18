import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

export const CommunityPage = () => {
    const navigate = useNavigate()
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
    const [newPost, setNewPost] = useState('')

    const handleLogin = () => {
        navigate('/login')
    }

    const handlePost = () => {
        if (newPost.trim()) {
            // Handle post creation logic here
            console.log('Creating new post:', newPost)
            setNewPost('')
        }
    }

    // Sample posts data
    const posts = [
        {
            id: 1,
            user: { name: 'LabManager', initials: 'LM', role: 'Quản lý', roleColor: 'bg-blue-100 text-blue-800' },
            time: '10 phút trước',
            content: 'Chúng ta cần phải làm những điều không ai nghĩ đến trước tiên, ngay cả những điều nhỏ nhặt nhất. Đừng bao giờ từ bỏ ước mơ.',
            likes: 3,
            comments: 2
        },
        {
            id: 2,
            user: { name: 'LabUser', initials: 'LU', role: 'Người dùng', roleColor: 'bg-orange-100 text-orange-800' },
            time: '1 giờ trước',
            content: 'Tôi đang gặp vấn đề với máy Blood Analyzer. Ai có thể giải thích nguyên lý hoạt động của nó không?',
            likes: 5,
            comments: 4
        },
        {
            id: 3,
            user: { name: 'Saleh Johnson', initials: 'SJ', role: 'Chuyên gia', roleColor: 'bg-blue-100 text-blue-800' },
            time: '2 giờ trước',
            content: 'Tôi đang nghiên cứu về quy trình chẩn đoán ung thư. Ai có thông tin về phương pháp điều trị mới nhất không?',
            likes: 8,
            comments: 6
        },
        {
            id: 4,
            user: { name: 'Tomida Buju', initials: 'TB', role: 'Người dùng', roleColor: 'bg-orange-100 text-orange-800' },
            time: '3 giờ trước',
            content: 'Ai có kinh nghiệm về tiêu chuẩn ISO 15189 cho phòng thí nghiệm không? Cần tài liệu hoặc kinh nghiệm thực tế.',
            likes: 7,
            comments: 1
        },
        {
            id: 5,
            user: { name: 'John Smith', initials: 'JS', role: 'Người dùng', roleColor: 'bg-orange-100 text-orange-800' },
            time: '4 giờ trước',
            content: 'Tôi đang tìm kiếm phần mềm quản lý phòng thí nghiệm hiệu quả. Ai có thể gợi ý không?',
            likes: 9,
            comments: 3
        },
        {
            id: 6,
            user: { name: 'Admin Anan', initials: 'AA', role: 'Chuyên gia', roleColor: 'bg-blue-100 text-blue-800' },
            time: '5 giờ trước',
            content: 'Chúng ta sẽ thảo luận về công nghệ mới trong xét nghiệm máu, bao gồm phân tích tự động và kỹ thuật hiện đại.',
            likes: 10,
            comments: 5
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-800">FPT.OJT.PROJECT.VN</h1>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:flex space-x-8 items-center">
                            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded transition-colors">Trang chủ</a>
                            <a href="#" className="text-blue-600 bg-blue-50 font-medium px-3 py-2 rounded transition-colors">Tin tức</a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded transition-colors">Tài nguyên</a>
                        </nav>

                        {/* Right side */}
                        <div className="flex items-center space-x-4">
                            {isAuthenticated ? (
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <span>Dashboard</span>
                                </button>
                            ) : (
                                <button
                                    onClick={handleLogin}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Đăng nhập
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Cộng đồng chuyên gia</h1>
                    <p className="text-gray-600 mb-6">
                        Kết nối, chia sẻ kiến thức và học hỏi từ các chuyên gia y tế hàng đầu
                    </p>

                    {/* Post Creation Form - Only show if authenticated */}
                    {isAuthenticated && (
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">
                                        {user?.name?.charAt(0) || 'U'}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        value={newPost}
                                        onChange={(e) => setNewPost(e.target.value)}
                                        placeholder="Bạn đang nghĩ gì? Chia sẻ kiến thức, kinh nghiệm của bạn với mọi người..."
                                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                        rows={4}
                                    />
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex space-x-4">
                                            <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                </svg>
                                                <span className="text-sm">Đính kèm</span>
                                            </button>
                                            <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                </svg>
                                                <span className="text-sm">Gắn thẻ</span>
                                            </button>
                                        </div>
                                        <button
                                            onClick={handlePost}
                                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                                        >
                                            Đăng bài
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Posts Feed */}
                <div className="space-y-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-semibold text-sm">{post.user.initials}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.user.roleColor}`}>
                                            {post.user.role}
                                        </span>
                                        <span className="text-sm text-gray-500">{post.time}</span>
                                    </div>
                                    <p className="text-gray-800 mb-4">{post.content}</p>
                                    <div className="flex items-center space-x-6">
                                        <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                            </svg>
                                            <span className="text-sm">{post.likes}</span>
                                        </button>
                                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            <span className="text-sm">{post.comments}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
