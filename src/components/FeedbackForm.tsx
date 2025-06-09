'use client';

import { useState } from 'react';
import { useFeedbackMutation } from '@/hooks/useRecipes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function FeedbackForm({ recipeId, recipeName }: FeedbackFormProps) {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    email: '',
    rating: 5,
    comment: '',
  });
  const [showForm, setShowForm] = useState(false);

  const feedbackMutation = useFeedbackMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const feedback: FeedbackData = {
      recipeId,
      ...formData,
    };

    try {
      await feedbackMutation.mutateAsync(feedback);
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        rating: 5,
        comment: '',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      rating: parseInt(value),
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Share Your Feedback
      </h2>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Did you try this recipe? Let others know how it turned out!
      </p>

      {!showForm ? (
        <Button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
        >
          Write a Review
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Your Name *
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address *
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">
              Rating *
            </Label>
            <Select value={formData.rating.toString()} onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent (5 stars)</SelectItem>
                <SelectItem value="4">⭐⭐⭐⭐ Very Good (4 stars)</SelectItem>
                <SelectItem value="3">⭐⭐⭐ Good (3 stars)</SelectItem>
                <SelectItem value="2">⭐⭐ Fair (2 stars)</SelectItem>
                <SelectItem value="1">⭐ Poor (1 star)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">
              Your Review *
            </Label>
            <Textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder={`Tell us about your experience making ${recipeName}...`}
            />
          </div>

          {feedbackMutation.isSuccess && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-green-800 dark:text-green-200 font-medium">
                  {feedbackMutation.data?.message}
                </p>
              </div>
            </div>
          )}

          {feedbackMutation.isError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <p className="text-red-800 dark:text-red-200 font-medium">
                  Failed to submit feedback. Please try again.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={feedbackMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 flex items-center gap-2"
            >
              {feedbackMutation.isPending && (
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              {feedbackMutation.isPending ? 'Submitting...' : 'Submit Review'}
            </Button>
            
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowForm(false)}
              className="px-6 py-3"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
} 