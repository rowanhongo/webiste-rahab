import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { blogPosts } = useAdmin();
  
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-royal-blue hover:text-deep-blue transition-colors font-inter font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Article Header */}
          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            {post.imageUrl && (
              <div className="w-full h-64 md:h-96">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-8">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>By {post.author}</span>
                </div>
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  <span className="bg-royal-blue/10 text-royal-blue px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6">
                {post.title}
              </h1>

              {/* Excerpt */}
              <div className="text-xl text-gray-600 font-inter mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-royal-blue">
                {post.excerpt}
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none font-inter">
                {post.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() ? (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ) : (
                    <br key={index} />
                  )
                ))}
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-playfair font-semibold text-gray-900 mb-2">About the Author</h3>
                    <p className="text-gray-600 font-inter">{post.author}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 font-inter">
                      Published on {new Date(post.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Call to Action */}
          <div className="mt-12 bg-royal-blue text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-playfair font-bold mb-4">
              Ready to Start Your Kingdom Business Journey?
            </h2>
            <p className="text-xl mb-6 font-inter opacity-90">
              Join our community of faith-driven entrepreneurs and turn your God-given vision into reality.
            </p>
            <Link
              to="/register"
              className="inline-block bg-mustard-yellow text-white px-8 py-4 rounded-full font-inter font-semibold hover:bg-warm-yellow transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;