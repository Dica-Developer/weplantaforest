package org.dicadeveloper.weplantaforest.user;

public enum Role {
	ADMIN, USER, ANONYMOUS, PLANTMANAGER, NEWSMANAGER,
	/**
	 * A user who is able to to easily create and manage other user accounts. He
	 * can easily create user with the same email and the same password as his
	 * own account (without the activation process). (Why we need that ? Company
	 * pays people in form of tree's on their 'own' but company managed ipat
	 * account.)
	 */
	ACCOUNTMANAGER;

	public String getIdentifier() {
		return toString();
	}

//	public static class Editor extends PropertyEditorSupport {
//		@Override
//		public void setAsText(final String text) throws IllegalArgumentException {
//			try {
//				final Role type = Role.valueOf(StringUtils.camelToUpper(text));
//				setValue(type);
//			} catch (final Exception e) {
//				setValue(null);
//			}
//		}
//	}
}
