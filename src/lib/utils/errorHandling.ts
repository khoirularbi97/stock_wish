/**
 * Maps authentication error messages to user-friendly Indonesian messages
 * @param error The error object from Supabase or other sources
 * @returns User-friendly error message in Indonesian
 */
export function getAuthErrorMessage(error: unknown): string {
  if (!error) {
    return 'Terjadi kesalahan yang tidak diketahui';
  }

  // Handle TypeError (network errors)
  if (error instanceof TypeError) {
    if (error.message === 'Failed to fetch') {
      return 'Tidak dapat terhubung ke server. Pastikan Supabase sudah dikonfigurasi dengan benar. Silakan cek file .env.local Anda dan pastikan URL Supabase valid.';
    }
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    const message = error.message;

    // Network/connection errors
    if (message === 'Failed to fetch') {
      return 'Tidak dapat terhubung ke server. Pastikan Supabase sudah dikonfigurasi dengan benar. Silakan cek file .env.local Anda.';
    }

    // Invalid credentials
    if (message.toLowerCase().includes('invalid login credentials') || 
        message.toLowerCase().includes('invalid credentials')) {
      return 'Email atau password salah. Silakan coba lagi.';
    }

    // User already exists
    if (message.toLowerCase().includes('already registered') || 
        message.toLowerCase().includes('user already registered')) {
      return 'Email sudah terdaftar. Silakan gunakan email lain atau login.';
    }

    // Email not confirmed
    if (message.toLowerCase().includes('email not confirmed')) {
      return 'Email belum dikonfirmasi. Silakan cek inbox email Anda.';
    }

    // Rate limiting
    if (message.toLowerCase().includes('rate limit') || 
        message.toLowerCase().includes('too many requests')) {
      return 'Terlalu banyak percobaan. Silakan tunggu beberapa saat.';
    }

    // Return the original message if no specific mapping found
    return message;
  }

  return 'Terjadi kesalahan. Silakan coba lagi.';
}

/**
 * Checks if an error is related to Supabase configuration
 * @param error The error object
 * @returns true if the error is related to Supabase configuration
 */
export function isSupabaseConfigError(error: unknown): boolean {
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return true;
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return message.includes('supabase') || 
           message.includes('failed to fetch') ||
           message.includes('environment variable');
  }

  return false;
}
