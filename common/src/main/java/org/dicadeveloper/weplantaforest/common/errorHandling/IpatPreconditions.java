package org.dicadeveloper.weplantaforest.common.errorHandling;

public final class IpatPreconditions {

    public static <T> T checkNotNull(T reference, String errorCode) throws IpatException{
        if (reference == null) {
            throw new IpatException(errorCode);
        }
        return reference;
    }
    
    public static void checkArgument(boolean expression, String errorCode) throws IpatException{
        if (!expression) {
            throw new IpatException(errorCode);
        }
      }


}
