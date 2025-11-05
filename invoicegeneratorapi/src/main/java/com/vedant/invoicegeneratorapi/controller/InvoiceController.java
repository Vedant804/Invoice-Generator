package com.vedant.invoicegeneratorapi.controller;

import com.vedant.invoicegeneratorapi.entity.Invoice;
import com.vedant.invoicegeneratorapi.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication; // <- Use this!
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/invoices")

public class InvoiceController {
    private final InvoiceService invoiceService;


    @PostMapping
    public ResponseEntity<Invoice> saveInvoice(@RequestBody Invoice invoice){
        return ResponseEntity.ok(invoiceService.saveInvoice(invoice));
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> fetchInvoices(Authentication authentication){
        return ResponseEntity.ok(invoiceService.fetchInvoices(authentication.getName()));

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeInvoice(@PathVariable String id, Authentication authentication) {
        if (authentication.getName() != null) {
            invoiceService.removeInvoice(id, authentication.getName());
            return ResponseEntity.noContent().build();
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User does not have permission to access this resource");
    }



}
