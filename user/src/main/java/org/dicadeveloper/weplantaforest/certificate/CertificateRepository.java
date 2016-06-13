package org.dicadeveloper.weplantaforest.certificate;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CertificateRepository extends CrudRepository<Certificate, Long> {
    
    public final static String COUNT_CERTIFICATES_BY_USER_QUERY ="SELECT COUNT(certificate) FROM Certificate certificate where certificate.creator.id = :userId";

    public Certificate findByNumber(@Param("number") String number);
    
    @Query(value = COUNT_CERTIFICATES_BY_USER_QUERY)
    public int countCertificatesByUser(@Param("userId") Long userId);
    
}
