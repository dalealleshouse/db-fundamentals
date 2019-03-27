## Common Traits

Research:
- Will MongoDB do document versions like CouchDB does?
- Document Attachments

- Non-relational
    * Normalizing
    * Table joins
    * Similar to file based systems in the eighties
- Schema-free
    * Schema-flexible may be more accurate
- Eventual consistency
    * Similar to DNS propagation
- Open source
- Distributed
    * Also possible with relational, but is generally much easier than with
        NoSQL
- "Web Scale"
    * Focus on throughput

CAP Therom
ACID - Atomicity, Consistency, Isolation, and Durability
- Guaranteed by relational

Indexing
- Not all support "secondary indexes"  and only index on key
- Primary keys are typically "clustered"

Queries
- No standard query language, uses procedural program
- Sometimes SQL is support
- MapReduce (Not a specific technology, it's a pattern)
    * Map - take overall query and split it up into chunks that are run on
        different nodes in the cluster
    * Reduce - combine all the chunks into a single result
    * Generally takes files and input and outputs a result - this is commiserate
        with the way NoSQL stores data
    * Hive offers a SQL like abstraction over Map Reduce

Sharding
- Each server stores separate partition
- Fan-out queries
- Can be distributed geographically

Key-Value Stores
- Redis, MemcacheDB (not MemcacheD), Voldermort, AMZ Simple DB, Azure Table
    Storage, AWS DynamoDB, Dynomite, Riak
- Collections (Tables) contain a big dictionary (hash map)
- Query only by key (sometimes)
- Schema differs between rows

Document Stores
- CouchDB, MongoDB
- Specialized Key Value store - adds indexing and organizational features
    * Ayende "A document database is, at its core, a key/value store with one
        major exception. Instead of just storing any blob in it, a document db
        requires that the data will be store in a format that the database can
        understand (i.e. JSON, XML etc). In most doc dbs, that means that we can
        now allow queries on the document data." -
        https://ayende.com/blog/4459/that-no-sql-thing-document-databases
    * Can refer to other documents by key, but the relations are non-enforceable
- Database which are similar to tables
- Documents which are similar to rows
    * JSON objects
    * Maintains history
- Most popular with Devs
- Behaves much like a standard web server
    * Each document has a URI
    * REST Interfaces

Wide Column Stores
- Google Big Table, HBase, Facebook Cassandra
- Tables with declared column families
- Each column has a key value pair that can vary from row to row
- Most "Big Data" ready
    * Especially Hbase + Hadoop
    * MapReduce ready out of the box

Graph
- Neo4j
- Tracks relationship rather than data
- Standard graph terminology

Best Uses for NoSQL
- Content Management
    * Document Database are superbly suited
    * KV pairs can store meta data
    * Can also store text based content
    * Attachment can store binary content
    * Versioning
- Product Catalogs
- Social
- Big Data
- Miscellaneous

KREL makes browser based Line of Business apps - Not websites

Best Uses for Relational
- Transactional
    * Business systems required atomic transactions
- Formal Schema
    * No need for MapReduce, document, or graph representation
- Line of Business Applications
- Declarative Query
- Banded Reporting

Are you building an application for creating data, or an application that uses
data...
