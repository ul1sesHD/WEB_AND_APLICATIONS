import { Injectable } from '@angular/core';
import { getSupabase, type Profile, profileService } from '@neighborhub/shared';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private sb = getSupabase();
  private cachedProfile: Profile | null = null;

  async getCurrentProfile(): Promise<Profile | null> {
    if (this.cachedProfile) return this.cachedProfile;
    const result = await profileService.getCurrentProfile(this.sb);
    if (result.error) return null;
    this.cachedProfile = result.data;
    return result.data;
  }

  async signIn(email: string, password: string): Promise<{ error?: string }> {
    const { error } = await this.sb.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    this.cachedProfile = null;
    return {};
  }

  async signOut(): Promise<void> {
    await this.sb.auth.signOut();
    this.cachedProfile = null;
  }

  clearCache(): void {
    this.cachedProfile = null;
  }
}
