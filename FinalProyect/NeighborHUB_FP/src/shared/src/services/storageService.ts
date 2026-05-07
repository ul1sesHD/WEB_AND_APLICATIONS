import type { Sb } from '../supabase/client';
import { ServiceError, ok, fail, type Result } from './_base';

const extOf = (file: File): string => file.name.split('.').pop()?.toLowerCase() ?? 'jpg';

export const uploadAvatar = async (sb: Sb, userId: string, file: File): Promise<Result<string>> => {
  const path = `${userId}/avatar.${extOf(file)}`;
  const { error } = await sb.storage.from('avatars').upload(path, file, { upsert: true });
  if (error) return fail(new ServiceError(error.message, 'avatar_upload_failed'));
  const { data } = sb.storage.from('avatars').getPublicUrl(path);
  return ok(data.publicUrl);
};

export type BusinessPhotoKind = 'card' | 'hero';

export const uploadBusinessPhoto = async (
  sb: Sb,
  userId: string,
  businessId: string,
  file: File,
  kind: BusinessPhotoKind,
): Promise<Result<string>> => {
  const path = `${userId}/${businessId}/${kind}.${extOf(file)}`;
  const { error } = await sb.storage.from('business-photos').upload(path, file, { upsert: true });
  if (error) return fail(new ServiceError(error.message, 'business_photo_upload_failed'));
  const { data } = sb.storage.from('business-photos').getPublicUrl(path);
  return ok(data.publicUrl);
};

export const removeBusinessPhoto = async (sb: Sb, path: string): Promise<Result<true>> => {
  const { error } = await sb.storage.from('business-photos').remove([path]);
  if (error) return fail(new ServiceError(error.message, 'business_photo_delete_failed'));
  return ok(true);
};
